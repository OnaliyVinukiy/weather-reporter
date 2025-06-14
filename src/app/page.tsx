import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-br from-blue-50 to-blue-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-center">
            Weatherly - Your Weather Reporter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="location">Location</Label>
              <div className="flex gap-2">
                <Input
                  id="location"
                  placeholder="Enter a city"
                  defaultValue="Colombo"
                />
                <Button>Search</Button>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Temperature:</span>
                <span className="text-sm">temp</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Humidity:</span>
                <span className="text-sm">humidity</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Wind Speed:</span>
                <span className="text-sm">speed</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">UV Index:</span>
                <span className="text-sm">uv</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
