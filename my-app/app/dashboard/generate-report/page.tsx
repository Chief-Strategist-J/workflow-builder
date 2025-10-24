"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  ArrowLeft,
  FileText,
  Download,
  Calendar,
  Filter,
  BarChart3,
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  Eye,
  RefreshCw,
} from "lucide-react"

const reportTypes = [
  {
    id: "project-summary",
    name: "Project Summary",
    description: "Overview of all projects, progress, and milestones",
    icon: FileText,
    sections: ["Project Status", "Timeline", "Budget", "Team Performance"],
    estimatedSize: "2.1 MB",
  },
  {
    id: "team-performance",
    name: "Team Performance",
    description: "Individual and team productivity metrics",
    icon: Users,
    sections: ["Individual Metrics", "Team Collaboration", "Task Completion", "Time Tracking"],
    estimatedSize: "1.8 MB",
  },
  {
    id: "financial-report",
    name: "Financial Report",
    description: "Revenue, expenses, and budget analysis",
    icon: DollarSign,
    sections: ["Revenue Analysis", "Expense Tracking", "Budget vs Actual", "Profitability"],
    estimatedSize: "3.2 MB",
  },
  {
    id: "analytics-dashboard",
    name: "Analytics Dashboard",
    description: "Comprehensive analytics and insights",
    icon: BarChart3,
    sections: ["User Analytics", "Performance Metrics", "Growth Trends", "Conversion Rates"],
    estimatedSize: "4.5 MB",
  },
  {
    id: "time-tracking",
    name: "Time Tracking Report",
    description: "Detailed breakdown of time spent on projects",
    icon: Clock,
    sections: ["Hours by Project", "Team Utilization", "Overtime Analysis", "Productivity Trends"],
    estimatedSize: "1.5 MB",
  },
]

const dateRanges = [
  { id: "7d", name: "Last 7 days" },
  { id: "30d", name: "Last 30 days" },
  { id: "90d", name: "Last 90 days" },
  { id: "1y", name: "Last year" },
  { id: "custom", name: "Custom range" },
]

const exportFormats = [
  { id: "pdf", name: "PDF", description: "Professional formatted document", extension: ".pdf", icon: "📄" },
  { id: "excel", name: "Excel", description: "Spreadsheet with data tables", extension: ".xlsx", icon: "📊" },
  { id: "csv", name: "CSV", description: "Raw data for analysis", extension: ".csv", icon: "📋" },
  { id: "json", name: "JSON", description: "Structured data format", extension: ".json", icon: "💾" },
]

const recentReports = [
  { name: "Project Summary - Q4 2024", date: "2024-01-15", format: "PDF", size: "2.1 MB", status: "completed" },
  { name: "Team Performance - December", date: "2024-01-10", format: "Excel", size: "1.8 MB", status: "completed" },
  { name: "Financial Report - Annual", date: "2024-01-05", format: "PDF", size: "3.2 MB", status: "completed" },
  { name: "Analytics Dashboard - Q3", date: "2024-01-01", format: "JSON", size: "4.5 MB", status: "completed" },
]

export default function GenerateReportPage() {
  const [selectedReport, setSelectedReport] = useState("")
  const [dateRange, setDateRange] = useState("30d")
  const [exportFormat, setExportFormat] = useState("pdf")
  const [selectedSections, setSelectedSections] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [customDateRange, setCustomDateRange] = useState({ start: "", end: "" })
  const [reportName, setReportName] = useState("")

  const handleSectionToggle = (section: string) => {
    setSelectedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    )
  }

  const handleSelectAllSections = () => {
    const reportData = reportTypes.find(r => r.id === selectedReport)
    if (reportData) {
      setSelectedSections(reportData.sections)
    }
  }

  const handleClearSections = () => {
    setSelectedSections([])
  }

  const handleGenerateReport = async () => {
    if (!selectedReport || selectedSections.length === 0) {
      alert("Please select a report type and at least one section")
      return
    }

    setIsGenerating(true)

    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 3000))

    const reportData = reportTypes.find(r => r.id === selectedReport)
    const formatData = exportFormats.find(f => f.id === exportFormat)

    const generatedReport = {
      name: reportName || `${reportData?.name} - ${dateRanges.find(r => r.id === dateRange)?.name}`,
      type: selectedReport,
      format: exportFormat,
      sections: selectedSections,
      dateRange,
      size: reportData?.estimatedSize,
      generatedAt: new Date().toISOString(),
    }

    console.log("Generated report:", generatedReport)

    // Simulate download
    simulateDownload(generatedReport)

    setIsGenerating(false)
    alert("Report generated and downloaded successfully!")
  }

  const simulateDownload = (report: any) => {
    // Create a fake file for download simulation
    const content = `Generated Report: ${report.name}\nType: ${report.type}\nFormat: ${report.format}\nSections: ${report.sections.join(', ')}\nGenerated: ${new Date(report.generatedAt).toLocaleString()}`
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = `${report.name.replace(/\s+/g, '_')}${exportFormats.find(f => f.id === report.format)?.extension}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleDownloadReport = (report: any) => {
    simulateDownload({ ...report, name: report.name })
  }

  const selectedReportData = reportTypes.find(r => r.id === selectedReport)
  const selectedFormatData = exportFormats.find(f => f.id === exportFormat)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>

          <div className="text-center space-y-2">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
              <BarChart3 className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              Generate Report
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Create comprehensive reports and export data for analysis
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Report Configuration */}
          <div className="lg:col-span-2 space-y-6">
            {/* Report Type Selection */}
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle>Select Report Type</CardTitle>
                <CardDescription>
                  Choose the type of report you want to generate
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {reportTypes.map((report) => (
                    <div
                      key={report.id}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedReport === report.id
                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                      onClick={() => {
                        setSelectedReport(report.id)
                        setSelectedSections([])
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <report.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {report.name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {report.description}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="text-xs">
                              {report.estimatedSize}
                            </Badge>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {report.sections.length} sections
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Report Options */}
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle>Report Options</CardTitle>
                <CardDescription>
                  Customize your report settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Report Name */}
                <div className="space-y-2">
                  <Label htmlFor="reportName">Report Name (Optional)</Label>
                  <Input
                    id="reportName"
                    placeholder="Enter custom report name"
                    value={reportName}
                    onChange={(e) => setReportName(e.target.value)}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dateRange">Date Range</Label>
                    <Select value={dateRange} onValueChange={setDateRange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {dateRanges.map((range) => (
                          <SelectItem key={range.id} value={range.id}>
                            {range.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="format">Export Format</Label>
                    <Select value={exportFormat} onValueChange={setExportFormat}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {exportFormats.map((format) => (
                          <SelectItem key={format.id} value={format.id}>
                            <div className="flex items-center gap-2">
                              <span>{format.icon}</span>
                              <div>
                                <div className="font-medium">{format.name}</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                  {format.description}
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Custom Date Range */}
                {dateRange === "custom" && (
                  <div className="grid md:grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={customDateRange.start}
                        onChange={(e) => setCustomDateRange(prev => ({ ...prev, start: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endDate">End Date</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={customDateRange.end}
                        onChange={(e) => setCustomDateRange(prev => ({ ...prev, end: e.target.value }))}
                      />
                    </div>
                  </div>
                )}

                {/* Report Sections */}
                {selectedReportData && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Report Sections</Label>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleSelectAllSections}
                        >
                          Select All
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleClearSections}
                        >
                          Clear All
                        </Button>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      {selectedReportData.sections.map((section) => (
                        <div key={section} className="flex items-center space-x-2">
                          <Checkbox
                            id={section}
                            checked={selectedSections.includes(section)}
                            onCheckedChange={() => handleSectionToggle(section)}
                          />
                          <Label htmlFor={section} className="text-sm">
                            {section}
                          </Label>
                        </div>
                      ))}
                    </div>
                    {selectedSections.length === 0 && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Select at least one section to include in the report
                      </p>
                    )}
                  </div>
                )}

                <div className="flex gap-3">
                  <Button
                    onClick={handleGenerateReport}
                    disabled={!selectedReport || selectedSections.length === 0 || isGenerating}
                    size="lg"
                    className="flex-1"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Generating Report...
                      </>
                    ) : (
                      <>
                        <Download className="mr-2 h-4 w-4" />
                        Generate Report
                      </>
                    )}
                  </Button>

                  {selectedReport && selectedSections.length > 0 && (
                    <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="lg">
                          <Eye className="mr-2 h-4 w-4" />
                          Preview
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Report Preview</DialogTitle>
                          <DialogDescription>
                            Preview of your report configuration
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <h4 className="font-medium mb-2">Report Details:</h4>
                            <div className="space-y-1 text-sm">
                              <p><strong>Type:</strong> {selectedReportData?.name}</p>
                              <p><strong>Date Range:</strong> {dateRanges.find(r => r.id === dateRange)?.name}</p>
                              <p><strong>Format:</strong> {selectedFormatData?.name} ({selectedFormatData?.description})</p>
                              <p><strong>Sections:</strong> {selectedSections.join(', ')}</p>
                              <p><strong>Estimated Size:</strong> {selectedReportData?.estimatedSize}</p>
                            </div>
                          </div>
                          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <h4 className="font-medium mb-2">What will be included:</h4>
                            <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                              <p>• {selectedReportData?.description}</p>
                              <p>• Data from the selected date range</p>
                              <p>• {selectedSections.length} report sections</p>
                              <p>• Formatted as {selectedFormatData?.name} file</p>
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsPreviewOpen(false)}>
                            Close
                          </Button>
                          <Button onClick={() => {
                            setIsPreviewOpen(false)
                            handleGenerateReport()
                          }}>
                            Generate Report
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Report Preview */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle>Report Preview</CardTitle>
                <CardDescription>
                  What your report will include
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedReportData ? (
                  <>
                    <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <selectedReportData.icon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {selectedReportData.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {selectedReportData.description}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h5 className="font-medium text-gray-900 dark:text-white">Included Sections:</h5>
                      {selectedSections.length > 0 ? (
                        selectedSections.map((section) => (
                          <Badge key={section} variant="secondary" className="mr-2">
                            {section}
                          </Badge>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          No sections selected
                        </p>
                      )}
                    </div>

                    <div className="pt-2 border-t">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Date Range:</span>
                        <span className="font-medium">
                          {dateRanges.find(r => r.id === dateRange)?.name}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm mt-1">
                        <span className="text-gray-600 dark:text-gray-400">Format:</span>
                        <span className="font-medium">
                          {exportFormats.find(f => f.id === exportFormat)?.icon} {exportFormats.find(f => f.id === exportFormat)?.name}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm mt-1">
                        <span className="text-gray-600 dark:text-gray-400">Size:</span>
                        <span className="font-medium">
                          {selectedReportData.estimatedSize}
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">
                      Select a report type to see preview
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Reports */}
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle>Recent Reports</CardTitle>
                <CardDescription>
                  Your recently generated reports
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentReports.map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {report.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {report.date} • {report.format} • {report.size}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={report.status === 'completed' ? 'default' : 'secondary'} className="text-xs">
                        {report.status}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDownloadReport(report)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Report Tips */}
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle>💡 Report Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Regular Reviews</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Schedule monthly reports</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Share with Team</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Keep everyone informed</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Data-Driven</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Use insights for decisions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
