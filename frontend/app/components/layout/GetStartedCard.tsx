import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card"
import { CreateTransaction } from "./CreateTransaction"

export const GetStartedCard = () => {
  return (
    <div className="p-4">
      <Card>
        <CardHeader className="p-2 pt-0 md:p-4">
          <CardTitle>Get Started</CardTitle>
          <CardDescription>Create a new account or make a transaction.</CardDescription>
        </CardHeader>
        <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              disabled
              size="sm"
              className="w-full"
            >
              Create Account
            </Button>
            <CreateTransaction />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
