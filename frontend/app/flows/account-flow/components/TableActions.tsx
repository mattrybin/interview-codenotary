import { Button } from "../../../components/ui/button"
import { File } from "lucide-react"

export const TableActions = () => (
  <div className="ml-auto flex items-center gap-2">
    <Button
      size="sm"
      variant="outline"
      className="h-7 gap-1 text-sm"
    >
      <File className="h-3.5 w-3.5" />
      <span className="sr-only sm:not-sr-only">Export</span>
    </Button>
  </div>
)
