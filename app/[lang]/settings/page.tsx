import { Bell, Flag, Flame, HandFist, Landmark, Settings2, Signpost, Trash2 } from "lucide-react"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/(components)/ui/tabs";
import { useId } from "react";
import { RadioGroup, RadioGroupItem } from "@/app/(components)/ui/radio-group";
import { Label } from "@/app/(components)/ui/label";
import { Button } from "@/app/(components)/ui/button";
import { Switch } from "@/app/(components)/ui/switch";

export default function Component() {
  const id = useId();

  const items = [
    { value: "1", label: "Socialist", Icon: HandFist },
    { value: "2", label: "Liberal", Icon: Flame }, // TODO: change flame
    { value: "3", label: "Conservative", Icon: Landmark },
    { value: "4", label: "Nationalist", Icon: Flag },
  ];

  return (
    <Tabs
      defaultValue="tab-1"
      orientation="vertical"
      className="w-full flex-row md:w-[500px] lg:w-[600px] mx-auto justify-center max-w-11/12 md:max-w-full mt-10"
    >
      <TabsList className="flex-col gap-1 rounded-none bg-transparent px-1 py-0 text-foreground ">
        <TabsTrigger
          value="tab-1"
          className="relative w-full justify-start after:absolute after:inset-y-0 after:start-0 after:-ms-1 after:w-0.5 hover:bg-accent hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent cursor-pointer"
        >
          <Settings2
            className="-ms-0.5 me-1.5 opacity-60"
            size={16}
            aria-hidden="true"
          />
          Options
        </TabsTrigger>
        <TabsTrigger
          value="tab-2"
          className="relative w-full justify-start after:absolute after:inset-y-0 after:start-0 after:-ms-1 after:w-0.5 hover:bg-accent hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent cursor-pointer"
        >
          <Bell
            className="-ms-0.5 me-1.5 opacity-60"
            size={16}
            aria-hidden="true"
          />
          Notifications
        </TabsTrigger>
        <TabsTrigger
          value="tab-3"
          className="relative w-full justify-start after:absolute after:inset-y-0 after:start-0 after:-ms-1 after:w-0.5 hover:bg-accent hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent cursor-pointer"
        >
          <Signpost
            className="-ms-0.5 me-1.5 opacity-60"
            size={16}
            aria-hidden="true"
          />
          Focus
        </TabsTrigger>
        <TabsTrigger
          value="tab-4"
          className="relative w-full justify-start after:absolute after:inset-y-0 after:start-0 after:-ms-1 after:w-0.5 hover:bg-accent hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-red-500 data-[state=active]:hover:bg-accent cursor-pointer"
        >
          <Trash2
            className="-ms-0.5 me-1.5 opacity-60 text-red-500"
            size={16}
            aria-hidden="true"
          />
          Delete account
        </TabsTrigger>
      </TabsList>
      <div className="grow rounded-md border text-start">
        <TabsContent value="tab-1">
          <div className="text-xl font-semibold mx-4 my-3">General settings</div>
          <hr className="mb-2 mx-2" />
        </TabsContent>
        <TabsContent value="tab-2" className="flex flex-col">
          <div className="text-xl font-semibold mx-4 my-3">Notification settings</div>
          <hr className="mb-2 mx-2" />
          <div className="text-md text-gray-600 mb-2 mx-3">Select how you would like to be notified:</div>
          <div className="px-4 py-3 flex items-center justify-between">
            <span className="text-sm text-foreground pointer-events-none">Email notifications</span>
            <div className="flex items-center">
              <Switch
                id={id}
                className="h-5 w-8 cursor-pointer [&_span]:size-4 data-[state=checked]:[&_span]:translate-x-3 data-[state=checked]:[&_span]:rtl:-translate-x-3"
                aria-label="Enable notifications"
              />
              <Label htmlFor={id} className="sr-only">
                Enable email notifications
              </Label>
            </div>
          </div>
          <div className="px-4 py-3 flex items-center justify-between">
            <span className="text-sm text-foreground pointer-events-none">Push notifications</span>
            <div className="flex items-center">
              <Switch
                id={id}
                className="h-5 w-8 cursor-pointer [&_span]:size-4 data-[state=checked]:[&_span]:translate-x-3 data-[state=checked]:[&_span]:rtl:-translate-x-3"
                aria-label="Enable notifications"
              />
              <Label htmlFor={id} className="sr-only">
                Enable push notifications
              </Label>
            </div>
          </div>
          <Button className="mx-4 my-4 cursor-pointer hover:bg-gray-700">Save</Button>
        </TabsContent>
        <TabsContent value="tab-3" className="flex flex-col">
          <div className="text-xl font-semibold mx-4 my-3">Focus settings</div>
          <hr className="mb-2 mx-2" />
          <div className="text-md text-gray-600 mb-2 mx-3">Choose your preferred option for editing:</div>
          <RadioGroup className="grid-cols-2 mx-4 my-1" defaultValue="1">
            {items.map((item) => (
              <div
                key={`${id}-${item.value}`}
                className="relative flex flex-col gap-4 rounded-md border border-input p-4 shadow-xs outline-none has-data-[state=checked]:border-primary/50  hover:bg-gray-50"
              >
                <div className="flex justify-between gap-2">
                  <RadioGroupItem
                    id={`${id}-${item.value}`}
                    value={item.value}
                    className="order-1 after:absolute after:inset-0 cursor-pointer"
                  />
                  <item.Icon className="opacity-60" size={16} aria-hidden="true" />
                </div>
                <Label htmlFor={`${id}-${item.value}`}>{item.label}</Label>
              </div>
            ))}
          </RadioGroup>
          <Button className="mx-4 my-4 cursor-pointer hover:bg-gray-700">Save</Button>
        </TabsContent>
      </div>
    </Tabs>
  )
}
