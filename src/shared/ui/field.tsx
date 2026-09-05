export const fieldControlClass =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

interface FieldProps {
  id: string;
  name: string;
  label: string;
  error?: string;
  type?: string;
  required?: boolean;
}

export function Field({ id, name, label, error, type = "text", required }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="font-medium text-foreground text-sm">
        {label} {required ? <span className="text-error">*</span> : null}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={fieldControlClass}
      />
      {error ? (
        <p id={`${id}-error`} className="text-error text-sm">
          {error}
        </p>
      ) : null}
    </div>
  );
}
