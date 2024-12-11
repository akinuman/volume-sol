import { useState } from 'react';
import toast from 'react-hot-toast';
import { FormField } from '../components/ui/FormField';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

const transferActions = [
  {
    id: 'send-volume',
    name: 'Send to Volume Wallets',
    description: 'Transfer SOL to volume wallets',
  },
  {
    id: 'return-main',
    name: 'Return to Main Wallet',
    description: 'Return SOL to main wallet',
  },
  {
    id: 'transfer-spl',
    name: 'Transfer SPL to Main',
    description: 'Transfer SPL tokens to main wallet',
  },
];

export default function Transfer() {
  const [selectedAction, setSelectedAction] = useState(null);
  const [tokenCA, setTokenCA] = useState('');
  const [receiverAddress, setReceiverAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedAction) {
      toast.error('Please select a transfer action');
      return;
    }
    if (selectedAction.id === 'transfer-spl' && !tokenCA) {
      toast.error('Please enter the token CA');
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
            <h1 className="text-2xl font-semibold text-gray-900">Transfer</h1>
            <p className="mt-2 text-sm text-gray-700">
              Transfer SOL and tokens between wallets.
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {transferActions.map((action) => (
            <Card
              key={action.id}
              className={`cursor-pointer transition-colors ${
                selectedAction?.id === action.id ? 'border-green-500 bg-green-50' : ''
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
          {selectedAction?.id === 'transfer-spl' && (
            <>
              <FormField
                label="Token CA"
                id="tokenCA"
                name="tokenCA"
                value={tokenCA}
                onChange={(e) => setTokenCA(e.target.value)}
                placeholder="Enter token CA"
              />

              <FormField
                label="Receiver Address"
                id="receiverAddress"
                name="receiverAddress"
                value={receiverAddress}
                onChange={(e) => setReceiverAddress(e.target.value)}
                placeholder="Enter receiver wallet address"
              />
            </>
          )}

          <Button
            type="submit"
            variant="success"
            fullWidth
            isLoading={isLoading}
          >
            Execute Transfer
          </Button>
        </form>
      </div>
    </div>
  );
}