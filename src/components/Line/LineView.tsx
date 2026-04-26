type Props = {
  value: 0 | 1;
};

export default function LineView({ value }: Props) {
  if (value === 1) {
    return <div className="h-2 bg-black w-24 rounded-sm" />;
  }

  return (
    <div className="flex gap-1 w-24">
      <div className="h-2 bg-black flex-1 rounded-sm" />
      <div className="h-2 bg-black flex-1 rounded-sm" />
    </div>
  );
}