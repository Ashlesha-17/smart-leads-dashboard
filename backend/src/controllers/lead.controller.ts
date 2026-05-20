import { Response } from "express";

import Lead from "../models/Lead.js";

import { AuthRequest } from "../middleware/auth.middleware.js";

export const createLead = async (
  req: AuthRequest,
  res: Response
) => {

  try {

    const {
      name,
      email,
      company,
      status,
      source,
    } = req.body;

    const lead = await Lead.create({
      name,
      email,
      company,
      status,
      source,
      assignedTo: req.user._id,
    });

    res.status(201).json({
      message: "Lead created successfully",
      lead,
    });

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
    });

  }

};

export const getLeads = async (req: AuthRequest, res: Response) => {
  try {
    const {
      status,
      source,
      search,
      page = 1,
      limit = 5,
      sort = "newest",
    } = req.query;

    const filter: any = {};

   if (req.user.role !== "admin") {
      filter.assignedTo = req.user._id;
    }

    if (search) {
      filter.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          company: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    if (status) {
      filter.status = status;
    }

    if (source) {
      filter.source = source;
    }

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;

    let sortOption: any = {};

    if (sort === "newest") {
      sortOption = { createdAt: -1 };
    } else if (sort === "oldest") {
      sortOption = { createdAt: 1 };
    }

    const leads = await Lead.find(filter)
      .populate("assignedTo", "name email")
      .sort(sortOption)
      .skip(skip)
      .limit(limitNumber);

    const totalLeads = await Lead.countDocuments(filter);

    return res.status(200).json({
      totalLeads,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalLeads / limitNumber),
      leads,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

export const updateLead = async (
  req: AuthRequest,
  res: Response
) => {

  try {

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!lead) {

      return res.status(404).json({
        message: "Lead not found",
      });

    }

    res.status(200).json({
      message: "Lead updated successfully",
      lead,
    });

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
    });

  }

};

export const deleteLead = async (req: AuthRequest, res: Response) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }

    if (
      req.user.role !== "admin" &&
      lead.assignedTo?.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Not allowed to delete this lead",
      });
    }

    await lead.deleteOne();

    console.log("USER:", req.user);
    console.log("ROLE:", req.user?.role);

    return res.status(200).json({
      message: "Lead deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
};
