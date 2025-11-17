"use client";

import { StarIcon, ChevronRight, ChevronLeft } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardFooter, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useRef, useEffect, useState } from 'react';

const feedbackData = [
	{
		id: 1,
		name: "Maria Santos",
		username: "@mariasantos",
		avatar: "/shopLogo/alingRosa.png",
		feedback: "Excellent quality meat! Always fresh and the prices are very reasonable. Aling Lita's stall is my go-to for all my meat needs.",
		rating: 5,
		date: "2024-11-14",
	},
	{
		id: 2,
		name: "Juan Dela Cruz",
		username: "@juandc",
		avatar: "/shopLogo/mangBerto.png",
		feedback: "Fast delivery and the products are always well-packaged. Very satisfied with the service!",
		rating: 4,
		date: "2024-11-12",
	},
	{
		id: 3,
		name: "Ana Reyes",
		username: "@anareyes",
		avatar: "/shopLogo/nenita.png",
		feedback: "Great customer service! The vendor is always responsive and helpful. Highly recommend!",
		rating: 5,
		date: "2024-11-10",
	},
	{
		id: 4,
		name: "Pedro Cruz",
		username: "@pedrocruz",
		avatar: "/shopLogo/alingLita.png",
		feedback: "Best meat quality in the area! Will definitely come back again.",
		rating: 5,
		date: "2024-11-13",
	},
];

// Sort feedback by date (latest first)
const sortedFeedback = [...feedbackData].sort((a, b) => 
	new Date(b.date).getTime() - new Date(a.date).getTime()
);

const FeedbackCard = ({ name, username, avatar, feedback, rating, date }: {
	name: string;
	username: string;
	avatar: string;
	feedback: string;
	rating: number;
	date: string;
}) => {
	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', { 
			year: 'numeric', 
			month: 'short', 
			day: 'numeric' 
		});
	};

	return (
		<div className='shrink-0 w-full snap-center px-4'>
			<Card className='border-none shadow-md'>
				<CardContent>
					<div className='flex justify-between items-start mb-2'>
						<p className='text-sm text-gray-700 dark:text-gray-300'>
							{feedback}
						</p>
					</div>
					<p className='text-xs text-gray-500 dark:text-gray-400 mt-2'>{formatDate(date)}</p>
				</CardContent>
				<CardFooter className='justify-between gap-3 max-sm:flex-col max-sm:items-stretch'>
					<div className='flex items-center gap-3'>
						<Avatar className='ring-[#7FC354] ring-2'>
							<AvatarImage src={avatar} alt={name} />
							<AvatarFallback className='text-xs'>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
						</Avatar>
						<div className='flex flex-col gap-0.5'>
							<CardTitle className='flex items-center gap-1 text-sm'>{name}</CardTitle>
							<CardDescription className='text-xs'>{username}</CardDescription>
						</div>
					</div>
					<div className='flex items-center gap-1'>
						{[...Array(5)].map((_, index) => (
							<StarIcon
								key={index}
								className={`size-4 ${
									index < rating
										? 'fill-amber-500 stroke-amber-500'
										: 'stroke-amber-500 fill-none'
								}`}
							/>
						))}
					</div>
				</CardFooter>
			</Card>
		</div>
	);
};

const FeedbackSkeleton = () => {
	return (
		<div className='shrink-0 w-full snap-center px-4'>
			<Card className='border-none shadow-md'>
				<CardContent>
					<div className='flex justify-between items-start mb-2'>
						<div className='space-y-2 w-full'>
							<Skeleton className='h-4 w-full' />
							<Skeleton className='h-4 w-5/6' />
							<Skeleton className='h-4 w-4/6' />
						</div>
					</div>
					<Skeleton className='h-3 w-24 mt-2' />
				</CardContent>
				<CardFooter className='justify-between gap-3 max-sm:flex-col max-sm:items-stretch'>
					<div className='flex items-center gap-3'>
						<Skeleton className='h-10 w-10 rounded-full' />
						<div className='flex flex-col gap-2'>
							<Skeleton className='h-4 w-24' />
							<Skeleton className='h-3 w-20' />
						</div>
					</div>
					<div className='flex items-center gap-1'>
						{[...Array(5)].map((_, index) => (
							<Skeleton key={index} className='h-4 w-4 rounded-sm' />
						))}
					</div>
				</CardFooter>
			</Card>
		</div>
	);
};

export default function CustomerFeedback() {
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [canScrollLeft, setCanScrollLeft] = useState(false);
	const [canScrollRight, setCanScrollRight] = useState(false);

	const updateScrollButtons = () => {
		const container = scrollContainerRef.current;
		if (!container) return;

		setCanScrollLeft(container.scrollLeft > 5);
		setCanScrollRight(
			container.scrollLeft < container.scrollWidth - container.clientWidth - 5
		);
	};

	const handleScrollRight = () => {
		const container = scrollContainerRef.current;
		if (!container) return;

		const cardWidth = container.offsetWidth;
		container.scrollBy({
			left: cardWidth,
			behavior: 'smooth'
		});
	};

	const handleScrollLeft = () => {
		const container = scrollContainerRef.current;
		if (!container) return;

		const cardWidth = container.offsetWidth;
		container.scrollBy({
			left: -cardWidth,
			behavior: 'smooth'
		});
	};

	useEffect(() => {
		// Simulate loading delay
		const loadTimeout = setTimeout(() => {
			setIsLoading(false);
		}, 1500);

		return () => clearTimeout(loadTimeout);
	}, []);

	useEffect(() => {
		const container = scrollContainerRef.current;
		if (!container || isLoading) return;

		updateScrollButtons();

		const handleScroll = () => {
			updateScrollButtons();

			// Clear existing timeout
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}

			// Set new timeout to scroll back to first after 10 seconds
			timeoutRef.current = setTimeout(() => {
				container.scrollTo({
					left: 0,
					behavior: 'smooth'
				});
			}, 10000);
		};

		container.addEventListener('scroll', handleScroll);

		return () => {
			container.removeEventListener('scroll', handleScroll);
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, [isLoading]);

	return (
		<div className='w-full p-4 space-y-4'>
			<div className='flex justify-between items-center'>
				<h2 className='text-xl font-bold text-gray-900 dark:text-gray-100'>Customer Feedback</h2>
				{isLoading ? (
					<Skeleton className='h-6 w-20 rounded-full' />
				) : (
					<div className='bg-[#7FC354] text-white px-3 py-1 rounded-full text-xs font-semibold'>
						{sortedFeedback.length} {sortedFeedback.length === 1 ? 'Review' : 'Reviews'}
					</div>
				)}
			</div>
			
			<div className='relative'>
				<div 
					ref={scrollContainerRef}
					className='overflow-x-auto snap-x snap-mandatory flex scrollbar-hide'
				>
					{isLoading ? (
						<>
							<FeedbackSkeleton />
							<FeedbackSkeleton />
							<FeedbackSkeleton />
						</>
					) : (
						sortedFeedback.map((feedback) => (
							<FeedbackCard key={feedback.id} {...feedback} />
						))
					)}
				</div>
				
				{/* Navigation Buttons */}
				{!isLoading && sortedFeedback.length > 1 && (
					<>
						{/* Left Button */}
						<button 
							onClick={handleScrollLeft}
							className='absolute left-6 top-1/2 -translate-y-1/2 bg-white/40 dark:bg-gray-800/40 rounded-full p-2 shadow-md hover:bg-white/70 hover:dark:bg-gray-800/70 transition-colors'
							aria-label="Scroll to previous review"
						>
							<ChevronLeft size={20} className='text-gray-600 dark:text-gray-400' />
						</button>

						{/* Right Button */}
						<button 
							onClick={handleScrollRight}
							className='absolute right-6 top-1/2 -translate-y-1/2 bg-white/40 dark:bg-gray-800/40 rounded-full p-2 shadow-md hover:bg-white/70 hover:dark:bg-gray-800/70 transition-colors'
							aria-label="Scroll to next review"
						>
							<ChevronRight size={20} className='text-gray-600 dark:text-gray-400' />
						</button>
					</>
				)}
			</div>
		</div>
	);
}