import express from "express";
import Tour from "../models/Tour.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

/* ---------------------- CREATE TOUR ---------------------- */
router.post("/", auth, async (req, res) => {
  const tour = await Tour.create({ ...req.body, createdBy: req.user.id });
  res.json(tour);
});

/* ---------------------- GET ALL TOURS ---------------------- */
router.get("/", async (req, res) => {
  const tours = await Tour.find();
  res.json(tours);
});

/* ---------------------- GET SINGLE TOUR (needed for edit) ---------------------- */
router.get("/:id", async (req, res) => {
  const tour = await Tour.findById(req.params.id);
  if (!tour) return res.status(404).json({ message: "Tour not found" });
  res.json(tour);
});

/* ---------------------- UPDATE TOUR ---------------------- */
router.put("/:id", auth, async (req, res) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(tour);
});

/* ---------------------- DELETE TOUR ---------------------- */
router.delete("/:id", auth, async (req, res) => {
  await Tour.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;
