import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Eye, EyeOff, User, Lock } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: any) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Admin credentials
    if (email === "novaai@gmail.com" && password === "Platts686@") {
      onSuccess({ 
        id: "admin", 
        email, 
        name: "Admin User", 
        isAdmin: true, 
        plan: "admin",
        credits: 999
      });
      onClose();
      return;
    }
    
    // Regular user login
    if (email && password) {
      onSuccess({ 
        id: "user", 
        email, 
        name: email.split("@")[0], 
        isAdmin: false, 
        plan: "free",
        credits: 5
      });
      onClose();
      return;
    }
    
    setError("Please enter valid credentials");
  };

  const handleRegister = () => {
    if (email && password) {
      onSuccess({ 
        id: "user", 
        email, 
        name: email.split("@")[0], 
        isAdmin: false, 
        plan: "free",
        credits: 5
      });
      onClose();
      return;
    }
    setError("Please enter valid credentials");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle>{isLogin ? "Sign In" : "Create Account"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white pl-10"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex flex-col space-y-3">
              {isLogin ? (
                <Button type="submit" className="w-full">Sign In</Button>
              ) : (
                <Button type="button" onClick={handleRegister} className="w-full">Create Account</Button>
              )}
              <Button 
                variant="ghost" 
                type="button" 
                onClick={() => setIsLogin(!isLogin)}
                className="w-full"
              >
                {isLogin ? "Need an account? Sign Up" : "Already have an account? Sign In"}
              </Button>
              <Button variant="outline" onClick={onClose} className="w-full">
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthModal;