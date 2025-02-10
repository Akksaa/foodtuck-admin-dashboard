import React from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AccessDeniedPageProps {
    title?: string;
    message?: string;
    onGoBack?: () => void;
  }

const AccessDeniedPage:React.FC<AccessDeniedPageProps> = ({ 
  title = "Access Denied", 
  message = "You do not have permission to access this page.",
  onGoBack
}) => {
  const router = useRouter();

  const handleGoBack = () => {
    if (onGoBack) {
      onGoBack();
    } else {
      router.back();
    }
  };

  return (
    <div className="flex items-center justify-center h-[70%] bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Lock className="w-8 h-8 text-red-500" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="space-y-4">
            <p className="text-gray-600">{message}</p>
            <div className="flex justify-center">
              <Button 
                variant="outline" 
                onClick={handleGoBack}
                className="mt-4 bg-primYellow text-sm inter transition-all py-2 border-primYellow border-2 hover:bg-white hover:border-primYellow hover:text-primYellow text-white"
              >
                Go Back
              </Button>
            </div>
            <div className="text-sm text-gray-500 mt-4">
              <p>Contact your system administrator if you believe this is an error.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccessDeniedPage;