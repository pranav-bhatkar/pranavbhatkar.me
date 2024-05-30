export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <div className="no-scroll-overlay"></div>
            <div className="loading-container">
                <div className="loading-screen">
                    <div className="rounded-div-wrap top">
                        <div className="rounded-div"></div>
                    </div>
                    <div className="loading-words">
                        <h2 className="home-active home-active-first">
                            Hello<div className="dot"></div>
                        </h2>
                        <h2 className="home-active">
                            Bonjour<div className="dot"></div>
                        </h2>
                        <h2 className="home-active">
                            स्वागत हे<div className="dot"></div>
                        </h2>
                        <h2 className="home-active">
                            Ciao<div className="dot"></div>
                        </h2>
                        <h2 className="home-active">
                            Olá<div className="dot"></div>
                        </h2>
                        <h2 className="home-active jap">
                            おい<div className="dot"></div>
                        </h2>
                        <h2 className="home-active">
                            Hallå<div className="dot"></div>
                        </h2>
                        <h2 className="home-active">
                            Guten tag<div className="dot"></div>
                        </h2>
                        <h2 className="home-active-last">
                            Hallo<div className="dot"></div>
                        </h2>
                        <h2 id="home-dot">
                            Home<div className="dot"></div>
                        </h2>
                        <h2 id="about-dot">
                            About<div className="dot"></div>
                        </h2>
                        <h2 id="projects-dot">
                            Projects<div className="dot"></div>
                        </h2>
                        <h2 id="blog-dot">
                            Blog<div className="dot"></div>
                        </h2>
                    </div>
                    <div className="rounded-div-wrap bottom">
                        <div className="rounded-div"></div>
                    </div>
                </div>
            </div>
            {children}
        </div>
    )
}
