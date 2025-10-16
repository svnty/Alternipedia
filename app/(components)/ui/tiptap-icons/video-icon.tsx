import * as React from "react"

export const VideoIcon = React.memo(
  ({ className, ...props }: React.SVGProps<SVGSVGElement>) => {
    return (
      <svg
        width="24"
        height="24"
        className={className}
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M4 6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6Z"
          fill="currentColor"
        />
        <path
          d="M15 10.5L10 7.5V13.5L15 10.5Z"
          fill="white"
        />
      </svg>
    )
  }
)

VideoIcon.displayName = "VideoIcon"