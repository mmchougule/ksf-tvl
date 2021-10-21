const express = require("express");
const router = express.Router();
const {kccTokens, ADDRESS_MAP, getTvlFromKcc, TVL } = require("./ksf")
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 1200 });

/**
 * GET TVL from memory.
 *
 * @return tvl | empty.
 */
router.get("/memory", async (req, res) => {
  let tvl;
  if (cache.has("tvl")) tvl = cache.get("tvl").toFixed(2);
  try {
    res.json({
      tvl: tvl,
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

/**
 * GET TVL from KCC.
 *
 * @return tvl | empty.
 */
router.get("/kcc", async (req, res) => {
  let tvlFromKccc = await getTvlFromKcc();

  cache.set("tvl", tvlFromKccc)

  console.log(`setting tvl cache: ${cache.get("tvl")}`);
  try {
    res.json({
      data: tvlFromKccc,
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

module.exports = router;
