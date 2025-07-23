import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export const providers = [
    {
        key: "google",
        label: <span className="font-cinzel text-primary">Google</span>,
        icon: (
            <svg className="w-3 h-3 mr-1.5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
        ),
        className: "",
        onClick: () => authClient.signIn.social({ provider: "google", callbackURL: "http://localhost:3001/dashboard" }),
    },
    {
        key: "roblox",
        label: <span className="font-cinzel text-yellow-600 dark:text-yellow-400">Roblox</span>,
        icon: (
            <svg className="w-3 h-3 mr-1.5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M7.346 2.857a.5.5 0 0 1 .64-.299l13.156 4.788a.5.5 0 0 1 .299.641l-4.788 13.156a.5.5 0 0 1-.641.299L2.856 16.654a.5.5 0 0 1-.299-.641L7.346 2.857Zm.768.812L3.668 15.885l12.216 4.446L20.33 8.115 8.114 3.67Z" clipRule="evenodd"></path>
                <path fill="currentColor" d="M10.036 8.625a.5.5 0 0 1 .64-.3l4.7 1.711a.5.5 0 0 1 .298.64l-1.71 4.7a.5.5 0 0 1-.64.298l-4.7-1.71a.5.5 0 0 1-.298-.64l1.71-4.7Zm.769.812-1.368 3.758 3.758 1.368 1.368-3.758-3.758-1.368Z" clipRule="evenodd"></path>
            </svg>
            
        ),
        className: "",
        onClick: () => authClient.signIn.social({ provider: "roblox", callbackURL: "/dashboard" }),
    },
    {
        key: "github",
        label: <span className="font-cinzel text-gray-800 dark:text-gray-200">GitHub</span>,
        icon: (
            <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
        ),
        className: "",
        onClick: () => authClient.signIn.social({ provider: "github", callbackURL: "http://localhost:3001/dashboard" }),
    },
    {
        key: "tiktok",
        label: <span className="font-cinzel text-pink-500 dark:text-pink-400">TikTok</span>,
        icon: (
            <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
            </svg>
        ),
        className: "",
        onClick: () => authClient.signIn.social({ provider: "tiktok", callbackURL: "/dashboard" }),
    },
    {
        key: "discord",
        label: <span className="font-cinzel text-indigo-600 dark:text-indigo-400">Discord</span>,
        icon: (
            <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
        ),
        className: "",
        onClick: () => authClient.signIn.social({ provider: "discord", callbackURL: "/dashboard" }),
    },
    {
        key: "spotify",
        label: <span className="font-cinzel text-green-600 dark:text-green-400">Spotify</span>,
        icon: (
            <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
        ),
        className: "",
        onClick: () => authClient.signIn.social({ provider: "spotify", callbackURL: "/dashboard" }),
    },
    {
        key: "microsoft",
        label: <span className="font-cinzel text-blue-700 dark:text-blue-400">Microsoft</span>,
        icon: (
            <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z" />
            </svg>
        ),
        className: "",
        onClick: () => authClient.signIn.social({ provider: "microsoft", callbackURL: "/dashboard" }),
    },
    {
        key: "twitch",
        label: <span className="font-cinzel text-purple-600 dark:text-purple-400">Twitch</span>,
        icon: (
            <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
            </svg>
        ),
        className: "",
        onClick: () => authClient.signIn.social({ provider: "twitch", callbackURL: "/dashboard" }),
    },
    {
        key: "facebook",
        label: <span className="font-cinzel text-blue-600 dark:text-blue-400">Facebook</span>,
        icon: (
            <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
        ),
        className: "",
        onClick: () => authClient.signIn.social({ provider: "facebook", callbackURL: "/dashboard" }),
    },
    {
        key: "twitter",
        label: <span className="font-cinzel text-black dark:text-white">Twitter</span>,
        icon: (
            <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        ),
        className: "",
        onClick: () => authClient.signIn.social({ provider: "twitter", callbackURL: "/dashboard" }),
    },
    {
        key: "linkedin",
        label: <span className="font-cinzel text-sky-700 dark:text-sky-400">LinkedIn</span>,
        icon: (
            <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
        className: "",
        onClick: () => authClient.signIn.social({ provider: "linkedin", callbackURL: "/dashboard" }),
    },
    {
        key: "apple",
        label: <span className="font-cinzel text-gray-900 dark:text-gray-100">Apple</span>,
        icon: (
            <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
            </svg>
        ),
        className: "",
        onClick: () => authClient.signIn.social({ provider: "apple", callbackURL: "/dashboard" }),
    },
    {
        key: "onlyfans",
        label: <span className="font-cinzel text-pink-600 dark:text-pink-400">OnlyFans</span>,
        icon: (
            <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9.5,18.5 L9.25935025,18.495941 C5.50478338,18.3690987 2.5,15.2854517 2.5,11.5 C2.5,7.63400675 5.63400675,4.5 9.5,4.5 C11.3012014,4.5 12.9435096,5.18030286 14.183995,6.2979791 M22.5,4.5 C22.080741,6.80592468 20.5109608,8.65586968 18.4478484,9.50136057 L21,9.5 C20.4396226,11.7415095 18.4932197,13.3451035 16.212802,13.4893966 C15.3786612,16.3121954 12.810235,18.3922397 9.74064975,18.495941 L9.5,18.5 L13.3148864,7.81831802 C14.0255881,5.82835319 15.9105278,4.5 18.023596,4.5 L22.5,4.5 Z M9.5,13.5 C10.6045695,13.5 11.5,12.6045695 11.5,11.5 C11.5,10.3954305 10.6045695,9.5 9.5,9.5 C8.3954305,9.5 7.5,10.3954305 7.5,11.5 C7.5,12.6045695 8.3954305,13.5 9.5,13.5 Z"></path>
            </svg>
        ),
        className: "border-pink-200 dark:border-pink-800 hover:bg-pink-100 dark:hover:bg-pink-900/20",
        onClick: () => toast("OnlyFans authentication temporarily disabled 😏"),
    },
];