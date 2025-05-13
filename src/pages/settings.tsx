import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Gamepad2, Moon, Sun, User } from "lucide-react";

export function SettingsPage() {
	return (
		<div className="space-y-8">
			{/* Header */}
			<div>
				<h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
				<p className="text-muted-foreground mt-1">
					Manage your preferences and app configuration
				</p>
			</div>

			{/* Settings Tabs */}
			<Tabs defaultValue="general" className="space-y-4">
				<TabsList>
					<TabsTrigger value="general">General</TabsTrigger>
					<TabsTrigger value="appearance">Appearance</TabsTrigger>
					<TabsTrigger value="notifications">Notifications</TabsTrigger>
					<TabsTrigger value="account">Account</TabsTrigger>
				</TabsList>

				{/* General Settings */}
				<TabsContent value="general">
					<Card>
						<CardHeader>
							<h3 className="text-lg font-medium">General Settings</h3>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="space-y-4">
								<div className="flex items-center justify-between">
									<div className="space-y-0.5">
										<Label>Game Library Location</Label>
										<p className="text-sm text-muted-foreground">
											Choose where your games are stored
										</p>
									</div>
									<Button variant="outline">Change</Button>
								</div>
								<div className="flex items-center justify-between">
									<div className="space-y-0.5">
										<Label>Default View</Label>
										<p className="text-sm text-muted-foreground">
											Choose your preferred library view
										</p>
									</div>
									<Select defaultValue="grid">
										<SelectTrigger className="w-[180px]">
											<SelectValue placeholder="Select view" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="grid">Grid</SelectItem>
											<SelectItem value="list">List</SelectItem>
											<SelectItem value="compact">Compact</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="flex items-center justify-between">
									<div className="space-y-0.5">
										<Label>Auto-sync Achievements</Label>
										<p className="text-sm text-muted-foreground">
											Automatically sync achievements with game platforms
										</p>
									</div>
									<Switch />
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				{/* Appearance Settings */}
				<TabsContent value="appearance">
					<Card>
						<CardHeader>
							<h3 className="text-lg font-medium">Appearance</h3>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="space-y-4">
								<div className="flex items-center justify-between">
									<div className="space-y-0.5">
										<Label>Theme</Label>
										<p className="text-sm text-muted-foreground">
											Choose your preferred theme
										</p>
									</div>
									<Select defaultValue="system">
										<SelectTrigger className="w-[180px]">
											<SelectValue placeholder="Select theme" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="light">
												<div className="flex items-center">
													<Sun className="mr-2 h-4 w-4" />
													Light
												</div>
											</SelectItem>
											<SelectItem value="dark">
												<div className="flex items-center">
													<Moon className="mr-2 h-4 w-4" />
													Dark
												</div>
											</SelectItem>
											<SelectItem value="system">
												<div className="flex items-center">
													<Gamepad2 className="mr-2 h-4 w-4" />
													System
												</div>
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="flex items-center justify-between">
									<div className="space-y-0.5">
										<Label>Accent Color</Label>
										<p className="text-sm text-muted-foreground">
											Choose your preferred accent color
										</p>
									</div>
									<Select defaultValue="blue">
										<SelectTrigger className="w-[180px]">
											<SelectValue placeholder="Select color" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="blue">Blue</SelectItem>
											<SelectItem value="purple">Purple</SelectItem>
											<SelectItem value="green">Green</SelectItem>
											<SelectItem value="red">Red</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="flex items-center justify-between">
									<div className="space-y-0.5">
										<Label>Compact Mode</Label>
										<p className="text-sm text-muted-foreground">
											Use a more compact layout
										</p>
									</div>
									<Switch />
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				{/* Notification Settings */}
				<TabsContent value="notifications">
					<Card>
						<CardHeader>
							<h3 className="text-lg font-medium">Notifications</h3>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="space-y-4">
								<div className="flex items-center justify-between">
									<div className="space-y-0.5">
										<Label>Push Notifications</Label>
										<p className="text-sm text-muted-foreground">
											Receive notifications for achievements and updates
										</p>
									</div>
									<Switch />
								</div>
								<div className="flex items-center justify-between">
									<div className="space-y-0.5">
										<Label>Email Notifications</Label>
										<p className="text-sm text-muted-foreground">
											Receive email updates about your gaming progress
										</p>
									</div>
									<Switch />
								</div>
								<div className="flex items-center justify-between">
									<div className="space-y-0.5">
										<Label>Notification Sound</Label>
										<p className="text-sm text-muted-foreground">
											Play sound for notifications
										</p>
									</div>
									<Switch />
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				{/* Account Settings */}
				<TabsContent value="account">
					<Card>
						<CardHeader>
							<h3 className="text-lg font-medium">Account</h3>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="space-y-4">
								<div className="space-y-2">
									<Label>Display Name</Label>
									<Input placeholder="Enter your display name" />
								</div>
								<div className="space-y-2">
									<Label>Email</Label>
									<Input type="email" placeholder="Enter your email" />
								</div>
								<div className="space-y-2">
									<Label>Password</Label>
									<Input type="password" placeholder="Enter your password" />
								</div>
								<div className="flex items-center justify-between">
									<div className="space-y-0.5">
										<Label>Two-Factor Authentication</Label>
										<p className="text-sm text-muted-foreground">
											Add an extra layer of security to your account
										</p>
									</div>
									<Switch />
								</div>
								<div className="flex justify-end">
									<Button>Save Changes</Button>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
