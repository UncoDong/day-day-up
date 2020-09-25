import asyncio 
import requests


loop = asyncio.get_event_loop()

async def main():
    
    # 创建一个任务 Future对象, 这个任务什么都不干/不执行任务
    fut = loop.creat_future()
    
    # 等待任务最终结束，没有结束会一直等待下去
    await fut

loop.run_until_complete(main)
