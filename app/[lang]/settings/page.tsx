import { CircleX, Trash2, Flag, Flame, HandFist, Landmark, CircleAlertIcon } from "lucide-react"
import { useId } from "react";
import { RadioGroup, RadioGroupItem } from "@/app/(components)/ui/radio-group";
import { Label } from "@/app/(components)/ui/label";
import { Button } from "@/app/(components)/ui/button";
import { Switch } from "@/app/(components)/ui/switch";
import Form from 'next/form';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/(components)/ui/dialog";
import { Input } from "@/app/(components)/ui/input";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { maskEmail } from '@/lib/email-mask';

export default async function Component() {
  const id = useId();
  const session = await getServerSession(authOptions);

  const items = [
    { value: "1", label: "Socialist", Icon: HandFist },
    { value: "2", label: "Liberal", Icon: Flame }, // TODO: change flame
    { value: "3", label: "Conservative", Icon: Landmark },
    { value: "4", label: "Nationalist", Icon: Flag },
  ];

  return (
    <Form
      className="w-full flex flex-col md:w-[500px] lg:w-[600px] mx-auto justify-center max-w-11/12 md:max-w-full mt-2"
      action=""
    >
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
            name="email-notifications"
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
            name="push-notifications"
          />
          <Label htmlFor={id} className="sr-only">
            Enable push notifications
          </Label>
        </div>
      </div>
      <div className="text-xl font-semibold mx-4 my-3">Focus settings</div>
      <hr className="mb-2 mx-2" />
      <div className="text-md text-gray-600 mb-2 mx-3">Choose your preferred option for editing:</div>
      <RadioGroup className="grid-cols-2 mx-4 my-1" defaultValue="1" name="focus-settings">
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
                disabled={true}
              />
              <item.Icon className="opacity-60" size={16} aria-hidden="true" />
            </div>
            <Label htmlFor={`${id}-${item.value}`}>{item.label}</Label>
          </div>
        ))}
      </RadioGroup>
      <div className="w-full text-gray-500 text-center italic text-sm">You can only change your focus setting once per month.</div>
      {/* CANCEL SUBSCRIPTION */}
      <div className="text-xl font-semibold mx-4 my-3">Manage subscription</div>
      <hr className="mb-2 mx-2" />
      <div className="mx-4">
        <div className="px-4 py-2">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="text-sm text-gray-600 mt-1">You're currently subscribed to Pro. Cancelling will revert your account to the free tier.</div>

              <div className="list-disc pl-5 mt-3 text-sm text-gray-700 space-y-1 pr-5">
                <p><CircleX className="inline" size={16} />&nbsp;Loss of acccess to your notes and watched articles</p>
                <p><CircleX className="inline" size={16} />&nbsp;No custom themes</p>
                <p><CircleX className="inline" size={16} />&nbsp;Lose AI assisted translations</p>
                <p><CircleX className="inline" size={16} />&nbsp;Advanced content analysis will be removed</p>
                <p><CircleX className="inline" size={16} />&nbsp;Ads may be shown and some features may be limited</p>
              </div>
            </div>

          </div>
          <div className="mt-3 flex flex-col items-center justify-between gap-4">
            <div className="text-sm text-gray-500">If you cancel, your subscription will remain active until the end of the current billing period.</div>
            <Button type="button" className="bg-yellow-200 opacity-80 hover:opacity-100 hover:scale-101 w-10/12 hover:bg-yellow-400 text-gray-700 hover:text-black border-transparent px-3 py-2 cursor-pointer rounded-md">Cancel PRO</Button>
          </div>
        </div>
      </div>

      {/* DELETE ACCOUNT */}
      <div className="text-xl font-semibold mx-4 my-3 flex items-center gap-2">Delete account</div>
      <hr className="mb-2 mx-2" />

      <div className="mx-4">
        <div className="px-4 py-2">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="text-sm text-gray-600 mt-1">Deleting your account is permanent and cannot be undone. All your data will be removed.</div>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <div className="mt-3 flex flex-col items-center justify-between gap-4">
                  <Button type="button" className="bg-red-300 opacity-80 hover:opacity-100 hover:scale-101 w-10/12 hover:bg-red-600 text-white border-transparent px-10 flex-items-center py-2 cursor-pointer rounded-md gap-2">
                    <Trash2 size={16} />
                    Delete account
                  </Button>
                </div>
              </DialogTrigger>
              <DialogContent>
                <div className="flex flex-col items-center gap-2">
                  <div
                    className="flex size-9 shrink-0 items-center justify-center rounded-full border"
                    aria-hidden="true"
                  >
                    <CircleAlertIcon className="opacity-80" size={16} />
                  </div>
                  <DialogHeader>
                    <DialogTitle className="sm:text-center text-red-500">
                      Final confirmation
                    </DialogTitle>
                    <DialogDescription className="sm:text-center">
                      Deleting your account cannot be undone. To confirm, please enter your email address&nbsp;
                       <span className="text-foreground">{maskEmail(session?.user.email || '')}</span>.
                    </DialogDescription>
                  </DialogHeader>
                </div>

                <form className="space-y-5">
                  <div className="*:not-first:mt-2">
                    <Label htmlFor={id}>Confirm identity</Label>
                    <Input
                      id={id}
                      type="text"
                      placeholder="Type your email to delete account"
                    />
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="outline" className="flex-1 cursor-pointer">
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button
                      type="button"
                      className="flex-1 cursor-pointer hover:bg-red-600 bg-red-400"
                    >
                      Delete
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>


      {/* <Trash2
        className="-ms-0.5 me-1.5 opacity-60 text-red-500"
        size={16}
        aria-hidden="true"
      />
      Delete account */}

      <Button type="submit" className="mx-auto w-full justify-center flex my-4 cursor-pointer hover:bg-gray-700 ">Save</Button>
    </Form>
  )
}
