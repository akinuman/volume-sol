import { useState } from "react";
import toast from "react-hot-toast";
import { FormField } from "../components/ui/FormField";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

const buyModes = [
  {
    id: "bundle-buy",
    name: "Bundle Buy (JITO)",
    description: "Bundle multiple wallet buys with JITO protection",
  },
  {
    id: "auto-volume",
    name: "Auto Volume",
    description: "Automatically generate volume with buy/sell patterns",
  },
  {
    id: "human-mode",
    name: "Human Mode",
    description: "Simulate human-like trading patterns",
  },
  {
    id: "micro-buy",
    name: "MicroBuy (SPAM)",
    description: "Rapid small buy transactions",
  },
  {
    id: "bump-bot",
    name: "BumpBot",
    description: "Maintain price levels with automated buys",
  },
  {
    id: "warmup",
    name: "Warmup Mode",
    description: "Prepare wallets with initial transactions",
  },
  {
    id: "stagger",
    name: "Stagger Buy",
    description: "Staggered buying across multiple wallets",
  },
];

export default function BuyModes() {
  const [selectedMode, setSelectedMode] = useState(null);
  const [tokenCA, setTokenCA] = useState("");
  const [delay, setDelay] = useState("5000");
  const [loops, setLoops] = useState("1");
  const [useJito, setUseJito] = useState(true);
  const [minDelay, setMinDelay] = useState("5");
  const [maxDelay, setMaxDelay] = useState("10");
  const [sellPercentage, setSellPercentage] = useState("50");
  const [buyAmount, setBuyAmount] = useState("0.1");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMode) {
      toast.error("Please select a buy mode");
      return;
    }
    if (!tokenCA) {
      toast.error("Please enter a token CA");
      return;
    }

    setIsLoading(true);
    try {
      toast.success(`Starting ${selectedMode.name}`);
      // Implementation will be connected to the terminal functions
    } catch (error) {
      toast.error("Operation failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-gray-900">Buy Modes</h1>
            <p className="mt-2 text-sm text-gray-700">
              Select a buy mode and configure your parameters to start trading.
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {buyModes.map((mode) => (
            <Card
              key={mode.id}
              className={`cursor-pointer transition-colors ${
                selectedMode?.id === mode.id
                  ? "border-indigo-500 bg-indigo-50"
                  : ""
              }`}
              onClick={() => setSelectedMode(mode)}
            >
              <Card.Header>
                <Card.Title>{mode.name}</Card.Title>
                <Card.Description>{mode.description}</Card.Description>
              </Card.Header>
            </Card>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6 max-w-2xl">
          <FormField
            label="Token CA"
            id="tokenCA"
            name="tokenCA"
            value={tokenCA}
            onChange={(e) => setTokenCA(e.target.value)}
            placeholder="Enter token CA"
          />

          {selectedMode?.id === "auto-volume" && (
            <>
              <FormField
                label="Minimum Delay (seconds)"
                id="minDelay"
                name="minDelay"
                type="number"
                value={minDelay}
                onChange={(e) => setMinDelay(e.target.value)}
                placeholder="Enter minimum delay in seconds"
              />
              <FormField
                label="Maximum Delay (seconds)"
                id="maxDelay"
                name="maxDelay"
                type="number"
                value={maxDelay}
                onChange={(e) => setMaxDelay(e.target.value)}
                placeholder="Enter maximum delay in seconds"
              />
              <FormField
                label="Sell Percentage"
                id="sellPercentage"
                name="sellPercentage"
                type="number"
                value={sellPercentage}
                onChange={(e) => setSellPercentage(e.target.value)}
                placeholder="Enter sell percentage (0-100)"
                min="0"
                max="100"
              />
            </>
          )}

          {selectedMode?.id !== "auto-volume" && (
            <FormField
              label="Delay (ms)"
              id="delay"
              name="delay"
              type="number"
              value={delay}
              onChange={(e) => setDelay(e.target.value)}
              placeholder="Enter delay in milliseconds"
            />
          )}

          {selectedMode?.id === "bump-bot" && (
            <FormField
              label="Buy Amount"
              id="buyAmount"
              name="buyAmount"
              type="number"
              value={buyAmount}
              onChange={(e) => setBuyAmount(e.target.value)}
              placeholder="Enter buy amount"
              step="0.1"
            />
          )}

          {selectedMode?.id === "warmup" && (
            <FormField
              label="Number of Loops"
              id="loops"
              name="loops"
              type="number"
              value={loops}
              onChange={(e) => setLoops(e.target.value)}
              placeholder="Enter number of loops"
              min="1"
            />
          )}

          {selectedMode?.id === "stagger" && (
            <>
              <FormField
                label="Number of Loops"
                id="loops"
                name="loops"
                type="number"
                value={loops}
                onChange={(e) => setLoops(e.target.value)}
                placeholder="Enter number of loops"
                min="1"
              />

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="useJito"
                  name="useJito"
                  checked={useJito}
                  onChange={(e) => setUseJito(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor="useJito"
                  className="text-sm font-medium text-gray-700"
                >
                  Use JITO
                </label>
              </div>
            </>
          )}

          <Button
            type="submit"
            variant="primary"
            fullWidth
            isLoading={isLoading}
          >
            Start Trading
          </Button>
        </form>
      </div>
    </div>
  );
}
