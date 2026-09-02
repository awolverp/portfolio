import { MailIcon } from "lucide-react";

import { profile, socials } from "#/components/resume/data";
import { Button } from "../ui/button";

export function ResumeSidebar() {
	return (
		<aside className="lg:sticky lg:top-24 lg:self-start">
			<h1 className="text-2xl font-bold md:text-3xl">{profile.name}</h1>
			<p className="mt-1 text-lg font-medium bg-linear-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
				Full-Stack Web & Rust Developer
			</p>

			<ul className="flex flex-col gap-3 mt-6">
				<a
					href={`mailto:${profile.email}`}
					className="flex items-center gap-3 p-2 rounded-lg transition-colors duration-150 hover:bg-muted"
				>
					<span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-surface">
						<MailIcon className="size-4" />
					</span>
					<span className="min-w-0">
						<span className="block text-xs text-muted-foreground">Email</span>
						<span className="block truncate text-sm">{profile.email}</span>
					</span>
				</a>

				{socials.map((social) => (
					<li key={social.name}>
						<a
							href={social.href}
							target="_blank"
							rel="noreferrer"
							className="flex items-center gap-3 p-2 rounded-lg transition-colors duration-150 hover:bg-muted"
						>
							<span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-surface">
								<img src={social.iconSrc} alt="" className="size-4" />
							</span>
							<span className="min-w-0">
								<span className="block text-xs text-muted-foreground">
									{social.name}
								</span>
								<span className="block truncate text-sm">{social.handle}</span>
							</span>
						</a>
					</li>
				))}
			</ul>

			<Button className="w-full mt-6">Download as PDF</Button>
		</aside>
	);
}
