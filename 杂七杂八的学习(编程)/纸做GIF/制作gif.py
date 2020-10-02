import imageio
import os

'''
Summary:
    用来制作gif的函数
Parameters:
    raw_dir  - 原始数据的文件夹，里面是按照顺序编号的图片
    gif_name - 字符串，所生成gif文件名，带.gif后缀
    duration - 图像间隔时间
Return:
    没有

'''
def create_gif(raw_dir, gif_name, duration = 1.0):
    # 这里是打开文件夹，获取里面的全部文件名
    list_dir = os.listdir(raw_dir)
    
    # 获得尾缀
    fil_end = list_dir[0].split('.')[1]
    print('尾缀是',fil_end)
    
    # 提取数字排序
    mid_list = [int(filname.split('.')[0]) for filname in list_dir]
    
    # 再装回来
    image_list = ['{0}.{1}'.format(t_filname,fil_end) for t_filname in sorted(mid_list)]
    print('{0}目录下的文件为{1}'.format(raw_dir,image_list))

    # 挨个打开每个图片文件
    frames = []
    for image_name in image_list:
        frames.append(imageio.imread(raw_dir+'/'+image_name))

    # 最后保存成gif
    imageio.mimsave(gif_name, frames, 'GIF', duration=duration)
    return

def main():
    # 将要进行转换的图片放在一个文件夹
    raw_dir = '原始gif数据'
    
    # gif的名字
    gif_name = 'new.gif'
    
    # 图像间隔时间
    duration = 0.5
    
    # 开始制作
    create_gif(raw_dir, gif_name, duration)

if __name__ == '__main__':
    main()
