import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { FiSearch } from 'react-icons/fi';
import { GrPowerReset } from "react-icons/gr";
import CardList from '../../../component/card/CardList';
import Modal from '../../../component/ui/modal/Modal';
import DefaultLayout from '../../../layouts/DefaultLayout';
import CompareCard from '../CompareCard';

const CardPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedKeyword, setSelectedKeyword] = useState('');
    const [search, setSearch] = useState("");
    const [searchData, setSearchData] = useState("");
    const categories = ['전체', '신용카드', '체크카드'];
    const keywords = ['주유', '카페', '간편결제', '구독', '통신', '음식점'];
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        setSelectedKeyword('');
    };

    const handleKeywordClick = (keyword) => {
        setSelectedCategory('');
        setSelectedKeyword(keyword);
    };

    const handleSearchClick = () => {
        setSearchData(search);
        setSearch('');
    };

    const handleOpen = () => {
        setIsModalOpen(true);
    };

    const handleClose = () => {
        setIsModalOpen(false);
    };

    const reset = () => {
        setSelectedCategory("");
        setSelectedKeyword("");
        setSearch("");
        handleSearchClick();
    }

    return (
        <DefaultLayout>
            <header className="flex justify-between items-center p-4 my-5">
                <div className="flex  items-center gap-4 w-3/5">
                    <div className="flex flex-col gap-2 ">
                        <div className="flex gap-10">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => handleCategoryClick(category)}
                                    className={`bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full h-10 ${selectedCategory === category ? 'bg-gray-600 text-white' : ''}`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            {keywords.map((keyword) => (
                                <button
                                    key={keyword}
                                    onClick={() => handleKeywordClick(keyword)}
                                    className={`bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full h-10 ${selectedKeyword === keyword ? 'bg-gray-700 text-white' : ''}`}
                                >
                                    {keyword}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        className=" bg-gray-900 hover:bg-gray-600 text-white font-bold py-[6px] px-5 rounded flex items-center gap-2 whitespace-nowrap "
                        onClick={reset}
                    ><GrPowerReset />
                        초기화
                    </button>
                    <div className="flex fixed items-center  bottom-10 right-20 ">
                        <button
                            className="bg-gray-900 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded h-10 whitespace-nowrap "
                            onClick={handleOpen}>
                            비교함
                        </button>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <input
                            placeholder="카드를 검색해보세요"
                            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />


                        <button
                            className="bg-gray-900 hover:bg-gray-600 text-white font-bold py-[6px] px-5 rounded flex items-center gap-2 whitespace-nowrap"
                            onClick={handleSearchClick}
                        >
                            <FiSearch /> 검색
                        </button>

                    </div>
                    <div>
                        {searchData ? (
                            <p className="text-sm text-gray-600">
                                {selectedCategory ? (
                                    <>
                                        {selectedCategory} 카드에서 {searchData}로 검색한 결과입니다
                                    </>
                                ) : (
                                    <>전체 카드에서 {searchData}(으)로 검색한 결과입니다</>
                                )}
                            </p>
                        ) : (
                            null
                        )}
                    </div>
                </div>

                {isModalOpen && createPortal(
                    <Modal onClose={handleClose} className='w-2/5'>
                        <CompareCard />
                    </Modal>,
                    document.body
                )}
            </header>

            {searchData ? (
                selectedCategory ? (
                    <p>{selectedCategory} 카드에서 {searchData}로 검색한 결과 입니다</p>
                ) : (
                    <p>전체 카드에서 {searchData}로 검색한 결과입니다</p>
                )
            ) : (
                <p></p>
            )}

            <CardList
                selectedCategory={selectedCategory}
                selectedKeyword={selectedKeyword}
                search={searchData}
            />
        </DefaultLayout>
    );
};

export default React.memo(CardPage);