"use server"

export async function test_action(prevLoginError: string, formdata: FormData) {

    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log(JSON.stringify(Array.from(formdata.entries())))

    return (JSON.stringify(Array.from(formdata.entries())))
}