"use client";

import { StarIcon, ChevronRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardFooter, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { useRef, useEffect } from 'react';

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
						<p className='text-sm text-gray-700'>
							{feedback}
						</p>
					</div>
					<p className='text-xs text-gray-500 mt-2'>{formatDate(date)}</p>
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

export default function CustomerFeedback() {
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		const container = scrollContainerRef.current;
		if (!container) return;

		const handleScroll = () => {
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
	}, []);

	return (
		<div className='w-full p-4 space-y-4'>
			<div className='flex justify-between items-center'>
				<h2 className='text-xl font-bold text-gray-900'>Customer Feedback</h2>
				<div className='bg-[#7FC354] text-white px-3 py-1 rounded-full text-xs font-semibold'>
					{sortedFeedback.length} {sortedFeedback.length === 1 ? 'Review' : 'Reviews'}
				</div>
			</div>
			
			<div className='relative'>
				<div 
					ref={scrollContainerRef}
					className='overflow-x-auto snap-x snap-mandatory flex scrollbar-hide'
				>
					{sortedFeedback.map((feedback) => (
						<FeedbackCard key={feedback.id} {...feedback} />
					))}
				</div>
				
				{/* Swipe Indicator */}
				{sortedFeedback.length > 1 && (
					<div className='absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none'>
						<ChevronRight size={20} className='text-gray-400 animate-pulse' />
					</div>
				)}
			</div>
		</div>
	);
}