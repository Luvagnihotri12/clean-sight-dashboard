
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface MetricProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  description?: string;
}

export function Metric({ title, value, icon, description }: MetricProps) {
  const getColorClass = (value: number): string => {
    if (value >= 80) return "text-green-400";
    if (value >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={getColorClass(value)}>{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-1 flex items-center">
          {value}%
          <span className="text-xs ml-2 text-muted-foreground">
            {description || (value >= 70 ? "Good" : value >= 50 ? "Moderate" : "Poor")}
          </span>
        </div>
        <Progress value={value} className="h-2" />
      </CardContent>
    </Card>
  );
}

interface CleanlinessMetricsProps {
  metrics: {
    overallScore: number;
    surfaceCleaniness: number;
    sanitization: number;
    compliance: number;
  };
}

export function CleanlinessMetrics({ metrics }: CleanlinessMetricsProps) {
  return (
    <div className="metrics-grid">
      <Metric 
        title="Overall Cleanliness" 
        value={metrics.overallScore} 
        icon={<span className="text-lg">✓</span>}
        description={metrics.overallScore >= 80 ? "Excellent" : metrics.overallScore >= 60 ? "Good" : "Needs Attention"}
      />
      <Metric 
        title="Surface Cleanliness" 
        value={metrics.surfaceCleaniness} 
        icon={<span className="text-lg">🔍</span>}
      />
      <Metric 
        title="Sanitization Level" 
        value={metrics.sanitization} 
        icon={<span className="text-lg">🧪</span>}
      />
      <Metric 
        title="Protocol Compliance" 
        value={metrics.compliance} 
        icon={<span className="text-lg">📋</span>}
      />
    </div>
  );
}
