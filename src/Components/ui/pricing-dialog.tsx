"use client"

import * as React from "react"
import { ChevronDown, ChevronUp, FileText } from 'lucide-react'
import { Button } from "@/Components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card"
import { Checkbox } from "@/Components/ui/checkbox"
import { Label } from "@/Components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group"
import { Dialog, DialogContent } from "@/Components/ui/dialog"
import { cn } from "@/lib/utils"
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from "@/context/GlobalContext"

interface PricingDialogProps {
  title: string
  price: string
  currency: string
  period: string
  isOpen: boolean
  onClose: () => void
}

export default function PricingDialog({
  title,
  price,
  currency,
  period,
  isOpen,
  onClose
}: PricingDialogProps) {
  const [invoiceChecked, setInvoiceChecked] = React.useState(false)
  const [invoiceRange, setInvoiceRange] = React.useState("100-250")
  const [checkedItems, setCheckedItems] = React.useState<{ [key: string]: boolean }>({
    ecommerce: false,
    reconciliation: false,
    excel: false,
    invoiceSales: false,
    invoices: false,
    purchase: false,
    other: false,
  })

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setCheckedItems(prev => ({ ...prev, [id]: checked }))
  }

  const navigate = useNavigate()  // Hook to navigate to payment page

  const handleActivatePlan = () => {
    // Assume `useGlobalContext` provides `user` with `hasUploadedAadhar` and `hasUploadedPan`
    const { user } = useGlobalContext();
  
    if (user?.hasUploadedAadhar && user?.hasUploadedPan) {
      // Navigate to payment if documents are uploaded
      navigate('/payment');
    } else {
      // Redirect to profile and display a message to complete profile information
      navigate('/profile', { state: { message: 'Please upload your Aadhar and PAN card to activate the plan.' } });
    }
  };
  

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-0">
        <Card className="border-0 shadow-none">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <FileText className="h-6 w-6 text-[#3b4ba7]" />
                <CardTitle>{title}</CardTitle>
              </div>
              <CardDescription className="text-base mt-0">{period}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <form>
              <div className="grid gap-2">
                <div className={`flex items-center space-x-2 p-2 rounded ${checkedItems.ecommerce ? 'bg-[#e8f5e9]' : ''}`}>
                  <Checkbox 
                    id="ecommerce" 
                    checked={checkedItems.ecommerce}
                    onCheckedChange={(checked) => handleCheckboxChange('ecommerce', checked === true)}
                    className={cn(
                      "h-4 w-4 border-[#3b4ba7] text-green-500 focus:ring-0 focus:ring-offset-0",
                      "checked:bg-green-500 checked:border-green-500 rounded-sm",
                      "data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500",
                      "after:content-[''] after:block after:w-full after:h-full"
                    )}
                  />
                  <Label htmlFor="ecommerce">Ecommerce operator</Label>
                </div>
                <div className={`flex items-center space-x-2 p-2 rounded ${checkedItems.reconciliation ? 'bg-[#e8f5e9]' : ''}`}>
                  <Checkbox 
                    id="reconciliation"
                    checked={checkedItems.reconciliation}
                    onCheckedChange={(checked) => handleCheckboxChange('reconciliation', checked === true)}
                    className={cn(
                      "h-4 w-4 border-[#3b4ba7] text-green-500 focus:ring-0 focus:ring-offset-0",
                      "checked:bg-green-500 checked:border-green-500 rounded-sm",
                      "data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500",
                      "after:content-[''] after:block after:w-full after:h-full"
                    )}
                  />
                  <Label htmlFor="reconciliation">2B reconciliation</Label>
                </div>
                <div className={`flex items-center space-x-2 p-2 rounded ${checkedItems.excel ? 'bg-[#e8f5e9]' : ''}`}>
                  <Checkbox 
                    id="excel"
                    checked={checkedItems.excel}
                    onCheckedChange={(checked) => handleCheckboxChange('excel', checked === true)}
                    className={cn(
                      "h-4 w-4 border-[#3b4ba7] text-green-500 focus:ring-0 focus:ring-offset-0",
                      "checked:bg-green-500 checked:border-green-500 rounded-sm",
                      "data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500",
                      "after:content-[''] after:block after:w-full after:h-full"
                    )}
                  />
                  <Label htmlFor="excel">Data shared in excel</Label>
                </div>

                <div className="space-y-2">
                  <div className={`flex items-center space-x-2 p-2 rounded ${checkedItems.invoiceSales ? 'bg-[#e8f5e9]' : ''}`}>
                    <Checkbox 
                      id="invoiceSales" 
                      checked={checkedItems.invoiceSales}
                      onCheckedChange={(checked) => {
                        handleCheckboxChange('invoiceSales', checked === true)
                        setInvoiceChecked(checked === true)
                      }}
                      className={cn(
                        "h-4 w-4 border-[#3b4ba7] text-green-500 focus:ring-0 focus:ring-offset-0",
                        "checked:bg-green-500 checked:border-green-500 rounded-sm",
                        "data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500",
                        "after:content-[''] after:block after:w-full after:h-full"
                      )}
                    />
                    <Label htmlFor="invoiceSales" className="flex items-center">
                      No. of invoices sales
                      {invoiceChecked ? <ChevronUp className="h-4 w-4 ml-2" /> : <ChevronDown className="h-4 w-4 ml-2" />}
                    </Label>
                  </div>
                  {invoiceChecked && (
                    <RadioGroup value={invoiceRange} onValueChange={setInvoiceRange} className="ml-6 space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="0-20" id="0-20" />
                        <Label htmlFor="0-20">0 - 20</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="25-100" id="25-100" />
                        <Label htmlFor="25-100">25 - 100</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="100-250" id="100-250" />
                        <Label htmlFor="100-250">100 - 250</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="more" id="more" />
                        <Label htmlFor="more">More</Label>
                      </div>
                    </RadioGroup>
                  )}
                </div>

                <div className={`flex items-center space-x-2 p-2 rounded ${checkedItems.invoices ? 'bg-[#e8f5e9]' : ''}`}>
                  <Checkbox 
                    id="invoices"
                    checked={checkedItems.invoices}
                    onCheckedChange={(checked) => handleCheckboxChange('invoices', checked === true)}
                    className={cn(
                      "h-4 w-4 border-[#3b4ba7] text-green-500 focus:ring-0 focus:ring-offset-0",
                      "checked:bg-green-500 checked:border-green-500 rounded-sm",
                      "data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500",
                      "after:content-[''] after:block after:w-full after:h-full"
                    )}
                  />
                  <Label htmlFor="invoices">Data shared in invoices</Label>
                </div>
                <div className={`flex items-center space-x-2 p-2 rounded ${checkedItems.purchase ? 'bg-[#e8f5e9]' : ''}`}>
                  <Checkbox 
                    id="purchase"
                    checked={checkedItems.purchase}
                    onCheckedChange={(checked) => handleCheckboxChange('purchase', checked === true)}
                    className={cn(
                      "h-4 w-4 border-[#3b4ba7] text-green-500 focus:ring-0 focus:ring-offset-0",
                      "checked:bg-green-500 checked:border-green-500 rounded-sm",
                      "data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500",
                      "after:content-[''] after:block after:w-full after:h-full"
                    )}
                  />
                  <Label htmlFor="purchase">No. of invoices purchase</Label>
                </div>
                <div className={`flex items-center space-x-2 p-2 rounded ${checkedItems.other ? 'bg-[#e8f5e9]' : ''}`}>
                  <Checkbox 
                    id="other"
                    checked={checkedItems.other}
                    onCheckedChange={(checked) => handleCheckboxChange('other', checked === true)}
                    className={cn(
                      "h-4 w-4 border-[#3b4ba7] text-green-500 focus:ring-0 focus:ring-offset-0",
                      "checked:bg-green-500 checked:border-green-500 rounded-sm",
                      "data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500",
                      "after:content-[''] after:block after:w-full after:h-full"
                    )}
                  />
                  <Label htmlFor="other">Other</Label>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex items-center justify-between pt-6">
            <Button className="bg-[#3b4ba7] hover:bg-[#2d3a8c]" onClick={handleActivatePlan}>
              Activate Plan
            </Button>
            <div>
              <span className="text-sm text-muted-foreground">Starting from</span>
              <span className="ml-1 text-2xl text-[red] font-bold">{currency}{price}</span>
              <span className="text-sm text-muted-foreground">/Month</span>
            </div>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  )
}
