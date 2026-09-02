import { MailIcon } from "lucide-react";

import { profile, socials } from "#/components/resume/data";

export function ResumeSidebar() {
	return (
		<aside className="lg:sticky lg:top-24 lg:self-start">
			<h1 className="text-2xl font-bold md:text-3xl">{profile.name}</h1>
			<p className="mt-1 text-lg font-medium">
				Full-Stack{" "}
				<span className="bg-linear-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
					Web
				</span>{" "}
				&{" "}
				<span className="bg-linear-to-r from-secondary-400 to-secondary-600 bg-clip-text text-transparent">
					Rust
				</span>{" "}
				Developer
			</p>

			<hr className="my-4 border-border" />

			<a href={`mailto:${profile.email}`} className="flex items-center gap-3">
				<span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-surface">
					<MailIcon className="size-4" />
				</span>
				<span className="min-w-0">
					<span className="block text-xs text-muted-foreground">Email</span>
					<span className="block truncate text-sm">{profile.email}</span>
				</span>
			</a>

			<hr className="my-4 border-border" />

			<p className="mb-3 text-sm text-muted-foreground">Socials</p>
			<ul className="flex flex-col gap-3">
				{socials.map((social) => (
					<li key={social.name}>
						<a
							href={social.href}
							target="_blank"
							rel="noreferrer"
							className="flex items-center gap-3"
						>
							<span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-surface">
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
		</aside>
	);
}
