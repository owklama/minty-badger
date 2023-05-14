// Badge criteria constants
const VOLUME_TIERS = [1000, 10000, 100000, 1000000];
const TRADE_TIERS = [10, 100, 1000];
const LIQUIDITY_TIERS = [1000, 10000, 100000, 1000000];

// Helper functions to calculate specific badges
function calculateVolumeBadge(volume) {
  for (let i = VOLUME_TIERS.length - 1; i >= 0; i--) {
    if (volume >= VOLUME_TIERS[i]) {
      return (
        ["Bronze Trader", "Silver Trader", "Gold Trader", "Platinum Trader"][
          i
        ] + " Badge"
      );
    }
  }
  return null;
}

function calculateTradeBadge(trades) {
  for (let i = TRADE_TIERS.length - 1; i >= 0; i--) {
    if (trades >= TRADE_TIERS[i]) {
      return (
        ["Bronze Active Trader", "Silver Active Trader", "Gold Active Trader"][
          i
        ] + " Badge"
      );
    }
  }
  return null;
}

function calculateLiquidityBadge(liquidity) {
  for (let i = LIQUIDITY_TIERS.length - 1; i >= 0; i--) {
    if (liquidity >= LIQUIDITY_TIERS[i]) {
      return (
        [
          "Bronze Provider",
          "Silver Provider",
          "Gold Provider",
          "Platinum Provider",
        ][i] + " Badge"
      );
    }
  }
  return null;
}

export function function calculateBadges(userData) {
  const badges = [];

  // First Trade Badge
  if (userData.firstTradeTimestamp) {
    badges.push("First Trade Badge");
  }

  // Volume Badges
  const volumeBadge = calculateVolumeBadge(userData.totalTradeVolume);
  if (volumeBadge) {
    badges.push(volumeBadge);
  }

  // Active Trader Badge
  const tradeBadge = calculateTradeBadge(userData.totalTrades);
  if (tradeBadge) {
    badges.push(tradeBadge);
  }

  // Liquidity Provider Badges
  const liquidityBadge = calculateLiquidityBadge(
    userData.totalLiquidityProvided,
  );
  if (liquidityBadge) {
    badges.push(liquidityBadge);
  }

  return badges;
}

export async function fetchAndCalculateBadges(address) {
  // Fetch the user's data
  const userData = await getUserData(address);

  // Calculate the user's badges
  const badges = calculateBadges(userData);

  // Log the user's data for debugging
  console.log("User Data:", userData);

  // Return the user's badges
  return badges;
}

// Call the function with a test address for testing purposes
// Comment out or remove in production
console.log(fetchAndCalculateBadges("0xYourEthereumAddressHere"));