import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React, { useMemo, useState } from 'react'
import LoaderButton from "./LoaderButton";
import { ADD_TO_CART, PATCH_CART } from '../redux/endpoints'
import { useDispatch, useSelector } from 'react-redux';
import { get_cart, update_login_modal } from '../redux/actions';
import { toast } from 'react-toastify';
import axios from 'axios'
const NoSale = () => {
    return <Button color='error' variant="outlined" className="exclude mt-2" fullWidth>ناموجود</Button>
}
const AskMe = ({ link }) => {
    return <a target={"_blank"} href={link ?? "#"} className="text-primary w-100 mt-2"><Button color='info' variant="outlined" className="exclude" fullWidth>استعلام موجودی</Button></a>
}
const AddToCartButton = React.memo(({ template, whatsappLink }) => {
    const basket = useSelector(s => s.order.basket)
    const config = useSelector(s=>s.main.configs)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false)
    const closeDeleteModal = () => setIsDeleteModalOpen(false)
    const openDeleteModal = () => setIsDeleteModalOpen(true)

    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const change_count = (template_id, count) => {
        setLoading(true)
        axios.post(PATCH_CART, { template_id, count })
            .then(res => {
                const { data } = res
                if (data.error === 0) {
                    if (data.type === "info") toast.info(data.message)
                    else toast.success("با موفقیت ثبت شد")
                    dispatch(get_cart())
                }
                else toast.error("خطا هنگام انجام عملیات")
            }).catch(ChangeCountError => {
                toast.error("خطا هنگام انجام عملیات")
                console.log(ChangeCountError);
            })
            .finally(f => {
                setLoading(false)
                closeDeleteModal()
            })
    }
    const increaseCount = (e) => {
        if (loading) return
        change_count(template.id, count + 1)
    }
    const decreaseCount = (e) => {
        if (loading) return
        if (count === 1) {
            console.log("ARE YOU SURE")
            openDeleteModal()
        } else {
            change_count(template.id, count - 1)
        }
    }

    const _remove_item = () => {
        change_count(template.id, 0)
    }
    const [count, is_in_cart] = useMemo(() => {
        let lines = basket?.orderline_set?.filter(line => line.template_id.id === template.id)
        if (!lines || lines.length < 1) return [0, false]
        return [lines.length, true]
    }, [basket])

    const _addToCart = () => {
        setLoading(true)
        axios.post(ADD_TO_CART, {
            template_id: template.id
        }).then(({ data }) => {
            if (data.error === 0) dispatch(get_cart())
            else if (data.error === 1 && data.message.indexOf('وارد') > -1) {
                dispatch(update_login_modal(true))
            }
            toast(data.message, { type: data.type })
        })
            .catch(AddToCardError => console.log(AddToCardError))
            .finally(f => setLoading(false))
    }

    return (
        <>
            {template?.no_sell ? <NoSale /> :
                template?.ask_me ? <AskMe link={config?.contactus?.whatsapp_link} />
                    : <>{
                        is_in_cart ?
                            <>
                                <small className='text-opacity-50 text-danger  ms-2'>در سبد</small>
                                <div dir="ltr" className={"counter " + (loading ? "blury" : "")}>
                                    <span onClick={increaseCount} role="button">+</span>
                                    <span className="">{count}</span>
                                    <span onClick={decreaseCount} role="button">-</span>
                                </div>
                            </>
                            :
                            <LoaderButton text={"افزودن به سبد"} loading={loading} onClick={_addToCart} />
                    }
                    </>

            }
            <Dialog
                open={isDeleteModalOpen}
                onClose={closeDeleteModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                maxWidth='sm'
            >
               
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        حذف از سبد ؟
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDeleteModal} disabled={loading}>انصراف</Button>
                    <Button onClick={_remove_item} autoFocus disabled={loading} >
                        تایید
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
})

export default AddToCartButton