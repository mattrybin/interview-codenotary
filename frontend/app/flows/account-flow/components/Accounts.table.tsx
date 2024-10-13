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
import { accounts } from "../../../dummy/transactions"
import { TableActions } from "../../../components/TableActions"
import { AccountType } from "../../../types/account"

const AccountTable = ({ accounts, filter }: { accounts: AccountType[]; filter: string }) => {
  const filteredAccounts =
    filter === "All"
      ? accounts
      : accounts.filter((account) => account.type === filter.toLowerCase())

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Account Name</TableHead>
          <TableHead className="hidden sm:table-cell">Type</TableHead>
          <TableHead className="hidden md:table-cell">Created Date</TableHead>
          <TableHead className="text-right">ID</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredAccounts.map((account) => (
          <TableRow key={account.id}>
            <TableCell>
              <div className="font-medium">{account.accountName}</div>
              <div className="hidden text-sm text-muted-foreground md:inline">{account.email}</div>
            </TableCell>
            <TableCell className="hidden sm:table-cell">
              <Badge
                className="text-xs"
                variant={account.type === "normal" ? "outline" : "secondary"}
              >
                {account.type.charAt(0).toUpperCase() + account.type.slice(1)}
              </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {new Date(account.createdDate).toISOString().slice(0, 10)}
            </TableCell>
            <TableCell className="text-right">{account.id}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export const AccountsTable = () => {
  return (
    <Tabs defaultValue="All">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="All">All</TabsTrigger>
          <TabsTrigger value="Normal">Normal</TabsTrigger>
          <TabsTrigger value="Professional">Professional</TabsTrigger>
        </TabsList>
        <TableActions />
      </div>
      <TabsContent value="All">
        <Card>
          <CardHeader className="px-7">
            <CardTitle>All Accounts</CardTitle>
            <CardDescription>All accounts in the system.</CardDescription>
          </CardHeader>
          <CardContent>
            <AccountTable
              accounts={accounts}
              filter="All"
            />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="Normal">
        <Card>
          <CardHeader className="px-7">
            <CardTitle>Normal Accounts</CardTitle>
            <CardDescription>Normal accounts in the system.</CardDescription>
          </CardHeader>
          <CardContent>
            <AccountTable
              accounts={accounts}
              filter="Normal"
            />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="Professional">
        <Card>
          <CardHeader className="px-7">
            <CardTitle>Professional Accounts</CardTitle>
            <CardDescription>Professional accounts in the system.</CardDescription>
          </CardHeader>
          <CardContent>
            <AccountTable
              accounts={accounts}
              filter="Professional"
            />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
