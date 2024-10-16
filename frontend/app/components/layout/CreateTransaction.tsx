import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import ky from "ky"
import { Button } from "../ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { AccountType } from "../../types/account"

export const CreateTransaction = () => {
  const navigate = useNavigate()
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [selectedAccount, setSelectedAccount] = useState("")
  const [accounts, setAccounts] = useState<AccountType[]>([])
  const [amount, setAmount] = useState("")
  const [transactionType, setTransactionType] = useState<"sending" | "receiving" | "">("")

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const fetchedAccounts: AccountType[] = await ky.get(`http://localhost:4000/accounts`).json()
        setAccounts(fetchedAccounts)
      } catch (error) {
        console.error("Error fetching accounts:", error)
      }
    }

    fetchAccounts()
  }, [])

  const handleSubmit = async () => {
    try {
      await ky
        .post(`http://localhost:4000/accounts/${selectedAccount}/transactions`, {
          json: {
            accountId: selectedAccount,
            amount: parseInt(amount),
            transactionType: transactionType
          }
        })
        .json()

      console.log("Transaction created successfully")
      setIsSheetOpen(false)

      // Navigate to the transaction page
      navigate(`/accounts/${selectedAccount}`)

      // Reset form fields
      setSelectedAccount("")
      setAmount("")
      setTransactionType("")
    } catch (error) {
      console.error("Error creating transaction:", error)
      // TODO: Handle error (e.g., show error message to user)
    }
  }

  const isFormValid = selectedAccount && amount && transactionType

  return (
    <Sheet
      open={isSheetOpen}
      onOpenChange={setIsSheetOpen}
    >
      <SheetTrigger asChild>
        <Button
          size="sm"
          className="w-full"
        >
          Create Transaction
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Create Transaction</SheetTitle>
        </SheetHeader>
        <div className="mt-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="account">Account</Label>
            <Select
              onValueChange={setSelectedAccount}
              value={selectedAccount}
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder="Select an account"
                  id="account"
                />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((account) => (
                  <SelectItem
                    key={account.id}
                    value={account.id.toString()}
                  >
                    {account.accountName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="transactionType">Transaction Type</Label>
            <Select
              onValueChange={(value) => setTransactionType(value as "sending" | "receiving")}
              value={transactionType}
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder="Select transaction type"
                  id="transactionType"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sending">Sending</SelectItem>
                <SelectItem value="receiving">Receiving</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!isFormValid}
            className="w-full"
          >
            Submit Transaction
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
