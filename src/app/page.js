"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Copy } from "lucide-react";
import { toast } from "sonner";

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(8);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function getCharTypes() {
    const charTypes = [];

    if (includeUppercase) {
      charTypes.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    }

    if (includeLowercase) {
      charTypes.push("abcdefghijklmnopqrstuvwxyz");
    }

    if (includeNumbers) {
      charTypes.push("1234567890");
    }

    if (includeSpecialChars) {
      charTypes.push("!@#$%&*(){}.");
    }

    return charTypes;
  }

  function randomCharFromTypes(charTypes) {
    if (charTypes.length === 0) return "";
    const randomIndex = Math.floor(Math.random() * charTypes.length);
    const selectedType = charTypes[randomIndex];
    return selectedType[Math.floor(Math.random() * selectedType.length)];
  }

  function generatePassword() {
    const charTypes = getCharTypes();

    if (charTypes.length === 0) {
      toast.error("Erro", {
        description: "Selecione pelo menos um tipo de caractere",
      });
      return;
    }

    if (isNaN(passwordLength) || passwordLength < 4 || passwordLength > 128) {
      toast.error("Formato inválido", {
        description: "Digite um número entre 4 e 128",
      });
      return;
    }

    let generatedPassword = "";
    for (let i = 0; i < passwordLength; i++) {
      generatedPassword += randomCharFromTypes(charTypes);
    }

    setPassword(generatedPassword);
    setShowPassword(true);
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(password);
    toast.success("Sucesso", {
      description: "Senha copiada com sucesso",
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 bg-[url('/llline.svg')] bg-[length:320%] bg-no-repeat bg-center p-4">
      <div className="flex flex-col items-center gap-3 max-w-md w-full">
        <img src="/pad1.svg" alt="Password Logo" className="w-24 h-24" />
        <h1 className="text-4xl font-medium text-slate-50 mb-2">Gerar senha</h1>

        {showPassword && (
          <div className="bg-slate-800 text-slate-50 w-full px-4 py-2 rounded-lg flex justify-between items-center">
            <span className="font-mono text-sm overflow-hidden text-ellipsis whitespace-nowrap">
              {password}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={copyToClipboard}
              className="text-green-500 hover:text-green-400"
            >
              <Copy size={18} />
            </Button>
          </div>
        )}

        <Card className="w-full bg-slate-800 border-none shadow-2xl">
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-center gap-4">
              <Input
                type="number"
                id="size"
                value={passwordLength}
                onChange={(e) =>
                  setPasswordLength(parseInt(e.target.value) || 0)
                }
                className="w-16 text-center text-white"
                min={4}
                max={128}
              />
              <Label htmlFor="size" className="text-slate-50">
                Quantidade de caracteres
              </Label>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Checkbox
                  id="include-uppercase"
                  checked={includeUppercase}
                  onCheckedChange={setIncludeUppercase}
                  className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                />
                <Label htmlFor="include-uppercase" className="text-slate-50">
                  Incluir letra maiúscula
                </Label>
              </div>

              <div className="flex items-center gap-3">
                <Checkbox
                  id="include-lowercase"
                  checked={includeLowercase}
                  onCheckedChange={setIncludeLowercase}
                  className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                />
                <Label htmlFor="include-lowercase" className="text-slate-50">
                  Incluir letra minúscula
                </Label>
              </div>

              <div className="flex items-center gap-3">
                <Checkbox
                  id="include-number"
                  checked={includeNumbers}
                  onCheckedChange={setIncludeNumbers}
                  className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                />
                <Label htmlFor="include-number" className="text-slate-50">
                  Incluir números
                </Label>
              </div>

              <div className="flex items-center gap-3">
                <Checkbox
                  id="include-special-charset"
                  checked={includeSpecialChars}
                  onCheckedChange={setIncludeSpecialChars}
                  className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                />
                <Label
                  htmlFor="include-special-charset"
                  className="text-slate-50"
                >
                  Incluir caractere especial
                </Label>
              </div>
            </div>

            <Button
              onClick={generatePassword}
              className="w-full bg-green-500 hover:bg-green-600 text-slate-950 font-medium"
            >
              Gerar senha
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
