import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "../../../components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../../../components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { Badge } from "../../../components/ui/badge"
import { TableActions } from "../../../components/TableActions"
import { TransactionType } from "../../../types/transaction"

const TransactionTable = ({
  transactions,
  filter
}: {
  transactions: TransactionType[]
  filter: string
}) => {
  const filteredTransactions =
    filter === "All"
      ? transactions
      : transactions.filter((transaction) => transaction.transactionType === filter.toLowerCase())

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Account Name</TableHead>
          <TableHead className="hidden sm:table-cell">Transaction Type</TableHead>
          <TableHead className="hidden md:table-cell">Created Date</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredTransactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell>
              <div className="font-medium">{transaction.accountName}</div>
              <div className="hidden text-sm text-muted-foreground md:inline">
                {transaction.accountEmail}
              </div>
            </TableCell>
            <TableCell className="hidden sm:table-cell">
              <Badge
                className="text-xs"
                variant={transaction.transactionType === "receiving" ? "outline" : "secondary"}
              >
                {transaction.transactionType.charAt(0).toUpperCase() +
                  transaction.transactionType.slice(1)}
              </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {new Date(transaction.createdDate).toISOString().slice(0, 10)}
            </TableCell>
            <TableCell className="text-right">
              <span
                className={
                  transaction.transactionType === "receiving" ? "text-green-600" : "text-red-600"
                }
              >
                {transaction.transactionType === "receiving" ? "+" : "-"}$
                {transaction.amount.toFixed(2)}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export const TransactionsTable = ({ transactions }: { transactions: TransactionType[] }) => {
  return (
    <Tabs defaultValue="All">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="All">All</TabsTrigger>
          <TabsTrigger value="Receiving">Receiving</TabsTrigger>
          <TabsTrigger value="Sending">Sending</TabsTrigger>
        </TabsList>
        <TableActions />
      </div>
      <TabsContent value="All">
        <Card>
          <CardHeader className="px-7">
            <CardTitle>All Transactions</CardTitle>
            <CardDescription>All transactions in the system.</CardDescription>
          </CardHeader>
          <CardContent>
            <TransactionTable
              transactions={transactions}
              filter="All"
            />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="Receiving">
        <Card>
          <CardHeader className="px-7">
            <CardTitle>Receiving Transactions</CardTitle>
            <CardDescription>Incoming transactions in the system.</CardDescription>
          </CardHeader>
          <CardContent>
            <TransactionTable
              transactions={transactions}
              filter="Receiving"
            />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="Sending">
        <Card>
          <CardHeader className="px-7">
            <CardTitle>Sending Transactions</CardTitle>
            <CardDescription>Outgoing transactions in the system.</CardDescription>
          </CardHeader>
          <CardContent>
            <TransactionTable
              transactions={transactions}
              filter="Sending"
            />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
