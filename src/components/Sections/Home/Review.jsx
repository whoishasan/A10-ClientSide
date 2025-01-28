import TryImg from '@/assets/image/try.webp'

const Review = () => {
    return (
        <>
            <section className="flex justify-center bg-pattern border-b dark:border-border-1">
                <div className="w-primary px-5 py-20">
                    <div className="w-full text-center space-y-3">
                        <h2 className="text-4xl dark:text-white font-semibold">Start Your Journey</h2>
                        <p>Identify your project and goals. Launch a campaign with clear <br/> funding targetsand rewards. Promote on social media and engage<br/> your supporters. Take the leap and realize your vision!</p>
                    </div>
                    <div data-aos="fade-in" data-aos-anchor-placement="center-center" className="w-full py-10 flex gap-10 flex-wrap lg:flex-nowrap z-[10]">
                        <div className="p-10 space-y-3 border dark:border-border-1 flex-grow rounded-xl bg-slate-100 dark:bg-[#1e293b4e]">
                            <h2 className="text-2xl font-semibold dark:text-white">Start A Capaign</h2>
                            <p>To effectively engage your audience, begin by sharing your unique story. Clearly outline your project and set specific funding targets. Enhance your campaign with visuals such as pictures and videos that...</p>
                        </div>
                        <div className="p-10 space-y-3 border dark:border-border-1 flex-grow rounded-xl bg-slate-100 dark:bg-[#1e293b4e]">
                            <h2 className="text-2xl font-semibold dark:text-white">Share with friends</h2>
                            <p>Make sure to share your crowdfunding campaign with your friends! Let them know about your project, how it works, and why it matters. Encourage them to spread the word too, as their support can help you reach...</p>
                        </div>
                        <div className="p-10 space-y-3 border dark:border-border-1 flex-grow rounded-xl bg-slate-100 dark:bg-[#1e293b4e]">
                            <h2 className="text-2xl font-semibold dark:text-white">Manage donations </h2>
                            <p>To effectively manage donations, keep track of contributions using a reliable platform that offers clear reporting. Acknowledge each donation promptly with a thank-you message to show your appreciation. Regularly....</p>
                        </div>
                    </div>
                    <div className='w-full flex justify-center'>
                        <img data-aos="fade-up" data-aos-anchor-placement="center-center" width={500} src={TryImg} className='z-20 opa' alt="Triangle" />
                    </div>
                </div>
            </section>
        </>
    );
}

export default Review