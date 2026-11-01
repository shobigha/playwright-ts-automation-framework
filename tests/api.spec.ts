import  {test, expect} from '@playwright/test';

test ('API GET Request', {tag:'@api'},async({request})=>
{
    const response= await request.get('https://jsonplaceholder.typicode.com/posts/1');
    expect(response.status()).toBe(200);

    const body=await response.json();
    expect(body.id).toBe(1);
    console.log(body);

})

test("API POST Request", {tag:'@api'},async({request})=>
{
    const response=await request.post('https://jsonplaceholder.typicode.com/posts', { data:
        {title: 'my title', body:'my body', userId:2 }
    });
    expect(response.status()).toBe(201);
    const body=await response.json();
    expect(body.title).toBe('my title');
    expect(body.userId).toBe(2);
    console.log(body);

})