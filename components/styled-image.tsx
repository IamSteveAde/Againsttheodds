import Image from "next/image"

interface StyledImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  variant?: "portrait" | "book" | "default"
}

export function StyledImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  variant = "default",
}: StyledImageProps) {
  const baseStyles = "transition-all duration-500 ease-out"

  const variantStyles = {
    portrait: "rounded-lg shadow-xl dark:shadow-2xl hover:shadow-2xl dark:hover:shadow-xl scale-100 hover:scale-102",
    book: "rounded-xl shadow-2xl dark:shadow-2xl hover:shadow-2xl dark:hover:shadow-xl border border-gray-200 dark:border-gray-700 transform hover:scale-105",
    default: "rounded-lg shadow-lg dark:shadow-gray-950 hover:shadow-xl",
  }

  return (
    <div className="relative overflow-hidden rounded-lg">
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        className={`${baseStyles} ${variantStyles[variant]} w-full h-auto ${className}`}
        priority={priority}
      />
    </div>
  )
}
