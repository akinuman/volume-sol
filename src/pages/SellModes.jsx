import { useState } from 'react';
import toast from 'react-hot-toast';
import { FormField } from '../components/ui/FormField';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

const sellModes = [
  {
    id: 'sell-all',
    name: 'Sell All (JITO)',
    description: 'Sell tokens from all wallets with JITO protection',
  },
  {
    id: 'single-wallet',
    name: 'Single Wallet Sell',
    description: 'Sell tokens from a specific wallet',
  },
  {
    id: 'delay-sell',
    name: 'Delay Sell',
    description: 'Sell tokens with specified delays',
  },
  {
    id: 'cleanup',
    name: 'Cleanup Mode',
    description: 'Clean up all PF tokens from sub wallets',
  },
  {
    id: 'ray-sell',
    name: 'Ray Single Sell',
    description: 'Sell using Raydium DEX',
  },
];

export default function SellModes() {
  const [selectedMode, setSelectedMode] = useState(null);
  const [tokenCA, setTokenCA] = useState('');
  const [percentage, setPercentage] = useState('100');
  const [delay, setDelay] = useState('5000');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMode) {
      toast.error('Please select a sell mode');
      return;
    }
    if (!tokenCA) {
      toast.error('Please enter a token CA');
      return;
    }

    setIsLoading(true);
    try {
      toast.success(`Starting ${selectedMode.name}`);
      // Implementation will be connected to the terminal functions
    } catch (error) {
      toast.error('Operation failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-gray-900">Sell Modes</h1>
            <p className="mt-2 text-sm text-gray-700">
              Select a sell mode and configure your parameters to start selling.
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sellModes.map((mode) => (
            <Card
              key={mode.id}
              className={`cursor-pointer transition-colors ${
                selectedMode?.id === mode.id ? 'border-red-500 bg-red-50' : ''
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

          <FormField
            label="Sell Percentage"
            id="percentage"
            name="percentage"
            type="number"
            value={percentage}
            onChange={(e) => setPercentage(e.target.value)}
            min="1"
            max="100"
            placeholder="Enter sell percentage"
          />

          {selectedMode?.id === 'delay-sell' && (
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

          <Button
            type="submit"
            variant="danger"
            fullWidth
            isLoading={isLoading}
          >
            Start Selling
          </Button>
        </form>
      </div>
    </div>
  );
}