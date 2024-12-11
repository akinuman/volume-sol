import express from "express";
import humanMode from "../../src/humanMode.js";
import microBuySpam from "../../src/microBuy.js";
import jitoBuy from "../../src/jitoBuy.js";
import buyAndSell from "../../src/sameTX.js";
import staggerBuy from "../../src/staggerBuy.js";
import warmupWallets from "../../src/warmup.js";
import { validateBuyParams } from "../middleware/validators.js";

const router = express.Router();

router.post("/jito-buy", validateBuyParams, async (req, res) => {
  try {
    const { ca, delay } = req.body;
    await jitoBuy(ca, delay);
    res.json({
      success: true,
      message: "Buy operation completed successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post("/human-mode", async (req, res) => {
  try {
    const { ca, minDelaySeconds, maxDelaySeconds, sellPct } = req.body;
    await humanMode(ca, minDelaySeconds, maxDelaySeconds, sellPct);
    res.json({ success: true, message: "Human mode operation completed" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post("/micro-buy", async (req, res) => {
  try {
    const { ca, delay } = req.body;
    await microBuySpam(ca, delay);
    res.json({ success: true, message: "Micro buy operation completed" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post("/buy-and-sell", async (req, res) => {
  try {
    const { ca, buyAmt, delay } = req.body;
    await buyAndSell(ca, buyAmt, delay, null);
    res.json({ success: true, message: "Buy and sell operation completed" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post("/stagger-buy", async (req, res) => {
  try {
    const { ca, delay, useJito, loops } = req.body;
    await staggerBuy(ca, delay, useJito, loops);
    res.json({ success: true, message: "Stagger buy operation completed" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post("/warmup", async (req, res) => {
  try {
    const { loops, delay } = req.body;
    await warmupWallets(loops, delay);
    res.json({ success: true, message: "Warmup operation completed" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
