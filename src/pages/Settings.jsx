import { useState } from "react";
import { configService } from "../config/config.service";
import toast from "react-hot-toast";
import { FormField } from "../components/ui/FormField";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

export default function Settings() {
  const [config, setConfig] = useState(configService.getConfig());
  const [activeTab, setActiveTab] = useState("network");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async (section, values) => {
    setIsLoading(true);
    try {
      switch (section) {
        case "network":
          configService.updateConfig({
            network: values,
          });
          break;
        case "trading":
          configService.updateConfig({
            trading: values,
          });
          break;
        case "compute":
          configService.updateConfig({
            compute: values,
          });
          break;
        case "jito":
          configService.updateConfig({
            jito: values,
          });
          break;
        case "wallets":
          configService.updateConfig({
            wallets: values,
          });
          break;
      }
      setConfig(configService.getConfig());
      toast.success("Settings saved successfully");
    } catch (error) {
      toast.error("Error saving settings");
    } finally {
      setIsLoading(false);
    }
  };

  const tabs = [
    { id: "network", name: "Network" },
    { id: "trading", name: "Trading" },
    { id: "compute", name: "Compute" },
    { id: "jito", name: "JITO" },
    { id: "wallets", name: "Wallets" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
          <p className="mt-2 text-sm text-gray-700">
            Configure your bot settings and preferences.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <div className="hidden sm:block">
          <nav className="flex space-x-4" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-500 hover:text-gray-700"
                } rounded-md px-3 py-2 text-sm font-medium`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <Card className="mt-8">
          <Card.Content className="p-6">
            {activeTab === "network" && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSave("network", {
                    rpc: e.target.rpc.value,
                    ws: e.target.ws.value,
                    blockEngineUrl: e.target.blockEngineUrl.value,
                  });
                }}
                className="space-y-6"
              >
                <FormField
                  label="RPC URL"
                  id="rpc"
                  name="rpc"
                  defaultValue={config.network.rpc}
                  placeholder="Enter RPC URL"
                />

                <FormField
                  label="WebSocket URL"
                  id="ws"
                  name="ws"
                  defaultValue={config.network.ws}
                  placeholder="Enter WebSocket URL"
                />

                <FormField
                  label="Block Engine URL"
                  id="blockEngineUrl"
                  name="blockEngineUrl"
                  defaultValue={config.network.blockEngineUrl}
                  placeholder="Enter Block Engine URL"
                />

                <Button type="submit" isLoading={isLoading}>
                  Save Network Settings
                </Button>
              </form>
            )}

            {activeTab === "trading" && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSave("trading", {
                    delay: parseInt(e.target.delay.value),
                    slippage: parseFloat(e.target.slippage.value),
                    buyLimits: {
                      minBuy: e.target.minBuy.value,
                      maxBuy: e.target.maxBuy.value,
                      microBuyAmount: e.target.microBuyAmount.value,
                    },
                  });
                }}
                className="space-y-6"
              >
                <FormField
                  label="Delay (ms)"
                  id="delay"
                  name="delay"
                  type="number"
                  defaultValue={config.trading.delay}
                  placeholder="Enter delay in milliseconds"
                />

                <FormField
                  label="Slippage"
                  id="slippage"
                  name="slippage"
                  type="number"
                  step="0.01"
                  defaultValue={config.trading.slippage}
                  placeholder="Enter slippage percentage"
                />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Buy Limits
                  </h3>
                  <FormField
                    label="Minimum Buy"
                    id="minBuy"
                    name="minBuy"
                    defaultValue={config.trading.buyLimits.minBuy}
                    placeholder="Enter minimum buy amount"
                  />

                  <FormField
                    label="Maximum Buy"
                    id="maxBuy"
                    name="maxBuy"
                    defaultValue={config.trading.buyLimits.maxBuy}
                    placeholder="Enter maximum buy amount"
                  />

                  <FormField
                    label="Micro Buy Amount"
                    id="microBuyAmount"
                    name="microBuyAmount"
                    defaultValue={config.trading.buyLimits.microBuyAmount}
                    placeholder="Enter micro buy amount"
                  />
                </div>

                <Button type="submit" isLoading={isLoading}>
                  Save Trading Settings
                </Button>
              </form>
            )}

            {activeTab === "compute" && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSave("compute", {
                    computeUnit: e.target.computeUnit.value,
                    computeLimit: e.target.computeLimit.value,
                  });
                }}
                className="space-y-6"
              >
                <FormField
                  label="Compute Unit"
                  id="computeUnit"
                  name="computeUnit"
                  defaultValue={config.compute.computeUnit}
                  placeholder="Enter compute unit"
                />

                <FormField
                  label="Compute Limit"
                  id="computeLimit"
                  name="computeLimit"
                  defaultValue={config.compute.computeLimit}
                  placeholder="Enter compute limit"
                />

                <Button type="submit" isLoading={isLoading}>
                  Save Compute Settings
                </Button>
              </form>
            )}

            {activeTab === "jito" && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSave("jito", {
                    enabled: e.target.enabled.checked,
                    tipPK: e.target.tipPK.value,
                    tipAmount: e.target.tipAmount.value,
                  });
                }}
                className="space-y-6"
              >
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="enabled"
                    name="enabled"
                    defaultChecked={config.jito.enabled}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="enabled"
                    className="text-sm font-medium text-gray-700"
                  >
                    Enable JITO
                  </label>
                </div>

                <FormField
                  label="Tip Private Key"
                  id="tipPK"
                  name="tipPK"
                  defaultValue={config.jito.tipPK}
                  placeholder="Enter tip private key"
                />

                <FormField
                  label="Tip Amount"
                  id="tipAmount"
                  name="tipAmount"
                  defaultValue={config.jito.tipAmount}
                  placeholder="Enter tip amount"
                />

                <Button type="submit" isLoading={isLoading}>
                  Save JITO Settings
                </Button>
              </form>
            )}

            {activeTab === "wallets" && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSave("wallets", {
                    sender: e.target.sender.value,
                    devWallet: e.target.devWallet.value,
                  });
                }}
                className="space-y-6"
              >
                <FormField
                  label="Sender Wallet"
                  id="sender"
                  name="sender"
                  defaultValue={config.wallets.sender}
                  placeholder="Enter sender wallet address"
                />

                <FormField
                  label="Dev Wallet"
                  id="devWallet"
                  name="devWallet"
                  defaultValue={config.wallets.devWallet}
                  placeholder="Enter dev wallet address"
                />

                <Button type="submit" isLoading={isLoading}>
                  Save Wallet Settings
                </Button>
              </form>
            )}
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}
