import FaqImage from '@/assets/image/faq.webp'
import { useState } from 'react';
import { JackInTheBox } from 'react-awesome-reveal';
import { IoIosArrowDown } from 'react-icons/io';

const Faqs = () => {

    const [avtiveFaq, setavtiveFaq] = useState(0);
    return (
        <>
            <section className="flex justify-center border-b dark:border-border-1">
                <div className="w-primary px-10 py-20 mt-20 lg:mt-0 flex justify-between flex-col lg:flex-row">
                    <JackInTheBox className="w-full lg:w-6/12 flex justify-center -mb-[490px] lg:!mb-0">
                        <img width={400} src={FaqImage} alt="Faq" className='animate-spin duration5s mt-5 !h-[400px] lg:w-[500px] lg:!h-[500px]' />
                    </JackInTheBox>
                    <div data-aos="fade-up" data-aos-anchor-placement="center-center" className='w-full lg:w-6/12 z-10 backdrop-blur-2xl'>
                        {
                            faqsData && faqsData.map((faq, index) => (
                                <div onClick={() => setavtiveFaq(index)} key={index} className='w-full space-y-5 cursor-pointer border-b dark:border-border-1 px-0 py-7'>
                                    <div className='flex items-center justify-between'>
                                        <h2 className='text-xl dark:text-white'>{faq?.question}</h2>
                                        <IoIosArrowDown size={25} className='dark:text-white'/>
                                    </div>
                                    <p className={`hidden ${index === avtiveFaq && '!block'}`}>{faq?.answer}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>
        </>
    );
}

export default Faqs


const faqsData = [
    {
        "question": "What is crowdfunding?",
        "answer": "Crowdfunding is the practice of raising small amounts of money from a large number of people, typically via the internet, to fund a project, business, or cause."
      },
      {
        "question": "How does crowdfunding work?",
        "answer": "Crowdfunding works by allowing individuals or organizations to create a campaign online, where they present their idea or project and ask for financial support. Backers can contribute to the campaign in exchange for rewards, equity, or simply to support the cause."
      },
      {
        "question": "What are the different types of crowdfunding?",
        "answer": "There are four main types of crowdfunding: donation-based, reward-based, equity-based, and debt-based. Donation-based crowdfunding focuses on donations, reward-based offers perks or rewards, equity-based provides shares in a company, and debt-based involves lending money with the expectation of repayment."
      },
      {
        "question": "What is a reward-based crowdfunding model?",
        "answer": "Reward-based crowdfunding allows backers to contribute to a project in exchange for non-financial rewards, such as exclusive products or services once the project is completed. This is common for creative projects like movies, games, and innovations."
      },
      {
        "question": "Can I fundraise for any project or business?",
        "answer": "While many projects and businesses can be crowdfunded, platforms typically have guidelines and restrictions. For example, platforms may not allow campaigns for illegal activities, adult content, or hazardous goods."
      },
      {
        "question": "What happens if a crowdfunding campaign doesn’t reach its goal?",
        "answer": "If a crowdfunding campaign does not reach its funding goal, some platforms may offer all or nothing models, where backers are not charged unless the campaign hits its target. Other platforms allow partial funding to go through."
      }
]