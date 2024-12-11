import { useState } from 'react';
import toast from 'react-hot-toast';
import { FormField } from '../components/ui/FormField';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

const walletActions = [
  {
    id: 'gen-wallets',
    name: 'Generate Wallets',
    description: 'Generate new wallets',
  },
  {
    id: 'check-balances',
    name: 'Check Balances',
    description: 'View SOL and token balances',
  },
  {
    id: 'close-accounts',
    name: 'Close Token Accounts',
    description: 'Close SPL token accounts',
  },
  {
    id: 'create-profiles',
    name: 'Create Profiles',
    description: 'Create PF profiles for wallets',
  },
  {
    id: 'unwrap-wsol',
    name: 'Unwrap WSOL',
    description: 'Unwrap wrapped SOL',
  },
  {
    id: 'set-amounts',
    name: 'Set Buy Amounts',
    description: 'Configure wallet buy amounts',
  },
];

export default function Wallets() {
  const [selectedAction, setSelectedAction] = useState(null);
  const [walletCount, setWalletCount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedAction) {
      toast.error('Please select an action');
      return;
    }
    if (selectedAction.id === 'gen-wallets' && !walletCount) {
      toast.error('Please enter the number of wallets');
      return;
    }

    setIsLoading(true);
    try {
      toast.success(`Starting ${selectedAction.name}`);
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
            <h1 className="text-2xl font-semibold text-gray-900">Wallet Management</h1>
            <p className="mt-2 text-sm text-gray-700">
              Manage your wallets and perform wallet-related actions.
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {walletActions.map((action) => (
            <Card
              key={action.id}
              className={`cursor-pointer transition-colors ${
                selectedAction?.id === action.id ? 'border-purple-500 bg-purple-50' : ''
              }`}
              onClick={() => setSelectedAction(action)}
            >
              <Card.Header>
                <Card.Title>{action.name}</Card.Title>
                <Card.Description>{action.description}</Card.Description>
              </Card.Header>
            </Card>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6 max-w-2xl">
          {selectedAction?.id === 'gen-wallets' && (
            <FormField
              label="Number of Wallets"
              type="number"
              id="walletCount"
              name="walletCount"
              value={walletCount}
              onChange={(e) => setWalletCount(e.target.value)}
              min="1"
              placeholder="Enter number of wallets"
            />
          )}

          <Button
            type="submit"
            variant="primary"
            fullWidth
            isLoading={isLoading}
          >
            Execute Action
          </Button>
        </form>
      </div>
    </div>
  );
}