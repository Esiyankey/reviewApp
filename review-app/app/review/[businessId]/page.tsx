// "use client"

// import type React from "react"

// import { useState, useRef } from "react"
// import Image from "next/image"
// import { Star, Mic, Camera, MessageSquare, X, Check, ChevronLeft, ChevronRight } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Textarea } from "@/components/ui/textarea"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Badge } from "@/components/ui/badge"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog"

// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// // Mock business data
// const businessData = {
//   id: "cafe-deluxe",
//   name: "Cafe Deluxe",
//   description: "A cozy cafe serving specialty coffee and pastries",
//   logo: "/placeholder.svg?height=80&width=80",
//   averageRating: 4.7,
//   totalReviews: 124,
// }

// // Mock reviews data
// const reviews = [
//   {
//     id: 1,
//     customer: {
//       name: "John Smith",
//       avatar: "/placeholder.svg?height=40&width=40",
//       isAnonymous: false,
//     },
//     rating: 5,
//     date: "2023-06-15",
//     content:
//       "Amazing coffee and atmosphere! The staff was incredibly friendly and attentive. Will definitely be coming back regularly.",
//     mediaType: "text",
//   },
//   {
//     id: 2,
//     customer: {
//       name: "Anonymous",
//       avatar: null,
//       isAnonymous: true,
//     },
//     rating: 4,
//     date: "2023-06-10",
//     content: "Good food but a bit pricey. The ambiance is nice though.",
//     mediaType: "text",
//   },
//   {
//     id: 3,
//     customer: {
//       name: "Sarah Johnson",
//       avatar: "/placeholder.svg?height=40&width=40",
//       isAnonymous: false,
//     },
//     rating: 5,
//     date: "2023-06-05",
//     content: "I took this picture of my latte art. It was beautiful and delicious!",
//     mediaType: "image",
//     mediaUrl: "/placeholder.svg?height=200&width=300",
//   },
// ]

// export default function ReviewPage({ params }: { params: { businessId: string } }) {
//   const [rating, setRating] = useState<number>(0)
//   const [reviewType, setReviewType] = useState<string>("text")
//   const [reviewText, setReviewText] = useState<string>("")
//   const [imagePreview, setImagePreview] = useState<string | null>(null)
//   const [isRecording, setIsRecording] = useState<boolean>(false)
//   const [audioURL, setAudioURL] = useState<string | null>(null)
//   const [showSuccessDialog, setShowSuccessDialog] = useState<boolean>(false)
//   const [showLoginDialog, setShowLoginDialog] = useState<boolean>(false)
//   const [isAnonymous, setIsAnonymous] = useState<boolean>(true)
//   const [currentPage, setCurrentPage] = useState<number>(1)
//   const reviewsPerPage = 3

//   const mediaRecorderRef = useRef<MediaRecorder | null>(null)
//   const audioChunksRef = useRef<Blob[]>([])

//   // Handle image upload
//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       const reader = new FileReader()
//       reader.onloadend = () => {
//         setImagePreview(reader.result as string)
//       }
//       reader.readAsDataURL(file)
//     }
//   }

//   // Handle audio recording
//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
//       const mediaRecorder = new MediaRecorder(stream)
//       mediaRecorderRef.current = mediaRecorder
//       audioChunksRef.current = []

//       mediaRecorder.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           audioChunksRef.current.push(event.data)
//         }
//       }

//       mediaRecorder.onstop = () => {
//         const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" })
//         const audioUrl = URL.createObjectURL(audioBlob)
//         setAudioURL(audioUrl)

//         // Stop all tracks from the stream
//         stream.getTracks().forEach((track) => track.stop())
//       }

//       mediaRecorder.start()
//       setIsRecording(true)
//     } catch (error) {
//       console.error("Error accessing microphone:", error)
//     }
//   }

//   const stopRecording = () => {
//     if (mediaRecorderRef.current && isRecording) {
//       mediaRecorderRef.current.stop()
//       setIsRecording(false)
//     }
//   }

//   // Handle review submission
//   const handleSubmitReview = () => {
//     if (isAnonymous) {
//       // Submit anonymously
//       setShowSuccessDialog(true)
//     } else {
//       // Show login dialog
//       setShowLoginDialog(true)
//     }
//   }

//   const handleLogin = () => {
//     // In a real app, this would handle the login process
//     setShowLoginDialog(false)
//     setShowSuccessDialog(true)
//   }

//   // Pagination handlers
//   const totalPages = Math.ceil(reviews.length / reviewsPerPage)
//   const currentReviews = reviews.slice((currentPage - 1) * reviewsPerPage, currentPage * reviewsPerPage)

//   const nextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1)
//     }
//   }

//   const prevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Header */}
//       <header className="border-b bg-background p-4">
//         <div className="container mx-auto flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <Image
//               src={businessData.logo || "/placeholder.svg"}
//               alt={businessData.name}
//               width={50}
//               height={50}
//               className="rounded-full"
//             />
//             <div>
//               <h1 className="text-xl font-bold">{businessData.name}</h1>
//               <div className="flex items-center">
//                 <div className="flex">
//                   {[...Array(5)].map((_, i) => (
//                     <Star
//                       key={i}
//                       className={`h-4 w-4 ${
//                         i < Math.floor(businessData.averageRating)
//                           ? "fill-primary text-primary"
//                           : "text-muted-foreground"
//                       }`}
//                     />
//                   ))}
//                 </div>
//                 <span className="ml-2 text-sm text-muted-foreground">
//                   {businessData.averageRating} ({businessData.totalReviews} reviews)
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       <main className="container mx-auto p-4 md:p-6">
//         <div className="mb-8">
//           <h2 className="mb-2 text-2xl font-bold">Share Your Experience</h2>
//           <p className="text-muted-foreground">
//             We value your feedback! Let us know about your experience at {businessData.name}.
//           </p>
//         </div>

//         {/* Rating Selection */}
//         <div className="mb-6">
//           <h3 className="mb-3 text-lg font-medium">Your Rating</h3>
//           <div className="flex">
//             {[1, 2, 3, 4, 5].map((star) => (
//               <button key={star} type="button" onClick={() => setRating(star)} className="p-1">
//                 <Star className={`h-8 w-8 ${star <= rating ? "fill-primary text-primary" : "text-muted-foreground"}`} />
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Review Type Selection */}
//         <div className="mb-6">
//           <Tabs value={reviewType} onValueChange={setReviewType}>
//             <TabsList className="grid w-full grid-cols-3">
//               <TabsTrigger value="text" className="flex items-center gap-2">
//                 <MessageSquare className="h-4 w-4" />
//                 Text
//               </TabsTrigger>
//               <TabsTrigger value="image" className="flex items-center gap-2">
//                 <Camera className="h-4 w-4" />
//                 Image
//               </TabsTrigger>
//               <TabsTrigger value="audio" className="flex items-center gap-2">
//                 <Mic className="h-4 w-4" />
//                 Audio
//               </TabsTrigger>
//             </TabsList>

//             <TabsContent value="text" className="mt-4">
//               <div className="space-y-4">
//                 <Textarea
//                   placeholder="Share your experience with us..."
//                   className="min-h-[150px]"
//                   value={reviewText}
//                   onChange={(e) => setReviewText(e.target.value)}
//                 />
//               </div>
//             </TabsContent>

//             <TabsContent value="image" className="mt-4">
//               <div className="space-y-4">
//                 <Textarea
//                   placeholder="Share your experience with us..."
//                   className="min-h-[100px]"
//                   value={reviewText}
//                   onChange={(e) => setReviewText(e.target.value)}
//                 />

//                 <div className="mt-4">
//                   {imagePreview ? (
//                     <div className="relative inline-block">
//                       <Image
//                         src={imagePreview || "/placeholder.svg"}
//                         alt="Preview"
//                         width={300}
//                         height={200}
//                         className="rounded-md"
//                       />
//                       <Button
//                         variant="destructive"
//                         size="icon"
//                         className="absolute right-2 top-2 h-6 w-6"
//                         onClick={() => setImagePreview(null)}
//                       >
//                         <X className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   ) : (
//                     <div className="flex items-center justify-center rounded-md border border-dashed p-6">
//                       <label className="flex cursor-pointer flex-col items-center">
//                         <Camera className="mb-2 h-8 w-8 text-muted-foreground" />
//                         <span className="mb-1 text-sm font-medium">Upload an image</span>
//                         <span className="text-xs text-muted-foreground">PNG, JPG up to 5MB</span>
//                         <Input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
//                       </label>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </TabsContent>

//             <TabsContent value="audio" className="mt-4">
//               <div className="space-y-4">
//                 <Textarea
//                   placeholder="Add a description to your audio review..."
//                   className="min-h-[100px]"
//                   value={reviewText}
//                   onChange={(e) => setReviewText(e.target.value)}
//                 />

//                 <div className="mt-4">
//                   {audioURL ? (
//                     <div className="rounded-md border p-4">
//                       <div className="mb-2 flex items-center justify-between">
//                         <span className="text-sm font-medium">Your audio review</span>
//                         <Button variant="destructive" size="icon" className="h-6 w-6" onClick={() => setAudioURL(null)}>
//                           <X className="h-4 w-4" />
//                         </Button>
//                       </div>
//                       <audio controls className="w-full">
//                         <source src={audioURL} type="audio/wav" />
//                         Your browser does not support the audio element.
//                       </audio>
//                     </div>
//                   ) : (
//                     <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-6">
//                       {isRecording ? (
//                         <div className="text-center">
//                           <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-red-500 text-white">
//                             <Mic className="h-6 w-6" />
//                           </div>
//                           <p className="mb-2 text-sm font-medium">Recording...</p>
//                           <Button variant="secondary" onClick={stopRecording}>
//                             Stop Recording
//                           </Button>
//                         </div>
//                       ) : (
//                         <div className="text-center">
//                           <Mic className="mb-2 h-8 w-8 text-muted-foreground" />
//                           <p className="mb-2 text-sm font-medium">Record your review</p>
//                           <Button variant="secondary" onClick={startRecording}>
//                             Start Recording
//                           </Button>
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </TabsContent>
//           </Tabs>
//         </div>

//         {/* Anonymous or Login Option */}
//         <div className="mb-6 rounded-md border p-4">
//           <h3 className="mb-3 text-lg font-medium">Submit as</h3>
//           <RadioGroup defaultValue="anonymous" onValueChange={(value) => setIsAnonymous(value === "anonymous")}>
//             <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
//               <div className="flex items-start space-x-2 rounded-md border p-4 w-full">
//                 <RadioGroupItem value="anonymous" id="anonymous" />
//                 <div className="flex flex-col space-y-1">
//                   <Label htmlFor="anonymous" className="font-medium">
//                     Anonymous
//                   </Label>
//                   <p className="text-sm text-muted-foreground">
//                     Your review will be posted without your name or information.
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-start space-x-2 rounded-md border p-4 w-full">
//                 <RadioGroupItem value="login" id="login" />
//                 <div className="flex flex-col space-y-1">
//                   <Label htmlFor="login" className="font-medium">
//                     Login & Get Rewards
//                   </Label>
//                   <p className="text-sm text-muted-foreground">
//                     Login to get exclusive coupons and discounts from {businessData.name}.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </RadioGroup>
//         </div>

//         <Button
//           className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
//           onClick={handleSubmitReview}
//           disabled={
//             rating === 0 ||
//             (reviewType === "text" && !reviewText) ||
//             (reviewType === "image" && !imagePreview) ||
//             (reviewType === "audio" && !audioURL)
//           }
//         >
//           Submit Review
//         </Button>

//         {/* Other Reviews Section */}
//         <div className="mt-12">
//           <h2 className="mb-4 text-2xl font-bold">What Others Are Saying</h2>

//           <div className="space-y-6">
//             {currentReviews.map((review) => (
//               <Card key={review.id}>
//                 <CardContent className="p-6">
//                   <div className="flex items-start space-x-4">
//                     <Avatar>
//                       {review.customer.avatar ? (
//                         <AvatarImage src={review.customer.avatar || "/placeholder.svg"} alt="Avatar" />
//                       ) : (
//                         <AvatarFallback>
//                           {review.customer.isAnonymous ? "AN" : review.customer.name.charAt(0)}
//                         </AvatarFallback>
//                       )}
//                     </Avatar>
//                     <div className="flex-1 space-y-1">
//                       <div className="flex items-center">
//                         <p className="font-medium">{review.customer.name}</p>
//                         {review.customer.isAnonymous && (
//                           <Badge variant="outline" className="ml-2">
//                             Anonymous
//                           </Badge>
//                         )}
//                         <div className="ml-auto flex">
//                           {[...Array(5)].map((_, i) => (
//                             <Star
//                               key={i}
//                               className={`h-4 w-4 ${
//                                 i < review.rating ? "fill-primary text-primary" : "text-muted-foreground"
//                               }`}
//                             />
//                           ))}
//                         </div>
//                       </div>
//                       <p className="text-sm text-muted-foreground">{new Date(review.date).toLocaleDateString()}</p>
//                       <p className="text-sm">{review.content}</p>
//                       {review.mediaType === "image" && review.mediaUrl && (
//                         <div className="mt-2">
//                           <Image
//                             src={review.mediaUrl || "/placeholder.svg"}
//                             alt="Review image"
//                             width={200}
//                             height={150}
//                             className="rounded-md"
//                           />
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="mt-6 flex items-center justify-center space-x-2">
//               <Button variant="outline" size="icon" onClick={prevPage} disabled={currentPage === 1}>
//                 <ChevronLeft className="h-4 w-4" />
//               </Button>
//               <span className="text-sm">
//                 Page {currentPage} of {totalPages}
//               </span>
//               <Button variant="outline" size="icon" onClick={nextPage} disabled={currentPage === totalPages}>
//                 <ChevronRight className="h-4 w-4" />
//               </Button>
//             </div>
//           )}
//         </div>
//       </main>

//       {/* Success Dialog */}
//       <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
//         <DialogContent className="sm:max-w-md">
//           <DialogHeader>
//             <DialogTitle>Thank You for Your Review!</DialogTitle>
//             <DialogDescription>
//               Your feedback has been submitted successfully and will help other customers make informed decisions.
//             </DialogDescription>
//           </DialogHeader>
//           <div className="flex h-20 items-center justify-center">
//             <div className="rounded-full bg-primary/10 p-3">
//               <Check className="h-8 w-8 text-primary" />
//             </div>
//           </div>
//           <DialogFooter className="sm:justify-center">
//             <Button type="button" variant="secondary" onClick={() => setShowSuccessDialog(false)}>
//               Close
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       {/* Login Dialog */}
//       <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
//         <DialogContent className="sm:max-w-md">
//           <DialogHeader>
//             <DialogTitle>Login to Submit Your Review</DialogTitle>
//             <DialogDescription>
//               Login to get exclusive coupons and discounts from {businessData.name}.
//             </DialogDescription>
//           </DialogHeader>
//           <div className="space-y-4 py-4">
//             <div className="space-y-2">
//               <Label htmlFor="email">Email</Label>
//               <Input id="email" type="email" placeholder="your.email@example.com" />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="password">Password</Label>
//               <Input id="password" type="password" />
//             </div>
//             <div className="rounded-md bg-secondary/10 p-3">
//               <div className="flex items-center gap-2">
//                 <div className="rounded-full bg-secondary/20 p-1">
//                   <Star className="h-4 w-4 text-secondary" />
//                 </div>
//                 <p className="text-sm font-medium">Exclusive Reward Available!</p>
//               </div>
//               <p className="mt-1 text-xs text-muted-foreground">
//                 Get 15% off your next purchase when you submit a review as a logged-in user.
//               </p>
//             </div>
//           </div>
//           <DialogFooter>
//             <Button type="button" variant="outline" onClick={() => setShowLoginDialog(false)}>
//               Cancel
//             </Button>
//             <Button type="button" onClick={handleLogin}>
//               Login & Submit
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }
