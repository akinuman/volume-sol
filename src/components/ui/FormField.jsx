import { Label } from "./Label";
import { Input } from "./Input";

export function FormField({ label, className, error, ...props }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={props.id}>{label}</Label>
      <Input 
        className={`${className} ${error ? 'border-red-500 focus-visible:ring-red-500' : ''}`} 
        {...props} 
      />
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}