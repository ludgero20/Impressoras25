interface AdSpaceProps {
  size: "leaderboard" | "rectangle" | "mobile" | "in-article";
  className?: string;
}

export default function AdSpace({ size, className = "" }: AdSpaceProps) {
  const dimensions = {
    leaderboard: "728x90",
    rectangle: "300x250",
    mobile: "320x100",
    "in-article": "responsive",
  };

  const sizeClasses = {
    leaderboard: "w-full h-[90px] max-w-[728px]",
    rectangle: "w-[300px] h-[250px]",
    mobile: "w-full h-[100px] max-w-[320px]",
    "in-article": "w-full h-auto min-h-[250px]",
  };

  return (
    <div
      className={`${sizeClasses[size]} bg-muted/30 border border-dashed border-border rounded-lg flex flex-col items-center justify-center p-4 ${className}`}
      data-testid={`ad-space-${size}`}
    >
      <p className="text-xs text-muted-foreground text-center mb-1">
        Espaço Publicitário
      </p>
      <p className="text-xs text-muted-foreground">
        Google AdSense ({dimensions[size]})
      </p>
    </div>
  );
}
