// Navbar.js
import React, { useState } from 'react';
import { Button } from "@material-tailwind/react";
import { Modal } from "./Modal";

export default function Navbar() {
    const [isRegistered, setIsRegistered] = useState(false);
    const [isOpenRegisterModal, setIsOpenRegisterModal] = useState(false);
    const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);

    return (
        <div className="flex justify-between items-center w-full h-[100px] bg-slate-100 px-12">
            <div>
                <img width={300} height={75} src="https://upload.wikimedia.org/wikipedia/en/thumb/e/e4/Hotels.com_logo.svg/2560px-Hotels.com_logo.svg.png" alt="" />
            </div>
            <div>
                {isRegistered ? (
                    <div>
                        <Button onClick={() => setIsOpenRegisterModal(!isOpenRegisterModal)}>Register</Button>
                        <Modal
                            body={
                                <div>
                                    <input type="text" placeholder="username" />
                                    <input type="password" placeholder="password" />
                                </div>
                            }
                            header={
                                <div>
                                    <h1>Register</h1>
                                </div>
                            }
                            isOpen={isOpenRegisterModal}
                            onClickFunction={() => setIsOpenRegisterModal(!isOpenRegisterModal)}
                        />
                    </div>
                ) : (
                    <div>
                        <Button onClick={() => setIsOpenLoginModal(!isOpenLoginModal)}>Login</Button>
                        <Modal
                            body="body"
                            header="header"
                            isOpen={isOpenLoginModal}
                            onClickFunction={() => setIsOpenLoginModal(!isOpenLoginModal)}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}