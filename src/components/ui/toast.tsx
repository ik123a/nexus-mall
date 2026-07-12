"use client";

import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn("fixed bottom-0 right-0 flex flex-col p-4 sm:p-4 sm:bottom-6 sm:right-6 sm:flex-row sm:p-6 gap-2 z-[100]", className)}
    {...props}
  />
));
ToastViewport.displayName = "ToastViewport";

type ToastProps = React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> & {
  variant?: "default" | "destructive" | "success";
};

const Toast = React.forwardRef<React.ElementRef<typeof ToastPrimitives.Root>, ToastProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <ToastPrimitives.Root
        ref={ref}
        className={cn(
          "glass-strong rounded-xl p-4 shadow-lg min-w-[280px] max-w-[420px] flex items-start gap-3 border",
          {
            "border-blue-400/30 bg-blue-500/10": variant === "default",
            "border-red-400/30 bg-red-500/10": variant === "destructive",
            "border-green-400/30 bg-green-500/10": variant === "success",
          },
          className,
        )}
        {...props}
      />
    );
  },
);
Toast.displayName = "Toast";

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn("flex-shrink-0 px-3 py-1 rounded-lg text-xs font-medium bg-white/10 hover:bg-white/20 transition", className)}
    {...props}
  />
));
ToastAction.displayName = "ToastAction";

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn("flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center hover:bg-white/10 transition", className)}
    toast-close=""
    {...props}
  >
    <X className="w-3 h-3 text-white/50" />
  </ToastPrimitives.Close>
));
ToastClose.displayName = "ToastClose";

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title ref={ref} className={cn("font-medium text-sm", className)} {...props} />
));
ToastTitle.displayName = "ToastTitle";

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description ref={ref} className={cn("text-xs text-white/60 mt-0.5", className)} {...props} />
));
ToastDescription.displayName = "ToastDescription";

type ToastActionElement = React.ReactElement<typeof ToastAction>;

export { type ToastProps, type ToastActionElement, ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose, ToastAction };