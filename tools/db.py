# coding:utf-8
"""
insert into miyedb.shop_suppliercategory(name,description,slug) select name,description,slug from mold.product_category where parent_id is NULL;
insert into catalogue_product(structure,title,slug,date_created,description,date_updated,is_discountable) select sku,name,slug,date_added,sku,date_added,active from mold.product_product;
update catalogue_product set is_discountable=0;
update catalogue_product set structure='standalone',product_class_id=1;
update partner_stockrecord set num_in_stock=1000;
update partner_stockrecord set price_excl_tax=price_currency;

insert into catalogue_category(path,depth,numchild,name,description,slug) select miyedb.product_category.slug,miyedb.product_category.site_id,miyedb.product_category.site_id,miyedb.product_category.name,miyedb.product_category.description,miyedb.product_category.slug from miyedb.product_category where miyedb.product_category.parent_id is NULL;

insert into miye_db.quan_newscategory(id, title, slug, extend, image, weight, valid) select id, name, slug, `desc`, image,weight,visit from feeds_feedcategory;

"""
import uuid
import random
import datetime
import MySQLdb
def connect(user, password, db):
    db = MySQLdb.connect(host="localhost", user=user, passwd=password, db=db, charset='utf8')
    cursor = db.cursor()
    return db, cursor


import os
from PIL import Image

def clipimage(size):
    width = int(size[0])
    height = int(size[1])
    box = ()
    if (width > height):
        dx = width - height
        box = (dx / 2, 0, height + dx / 2,  height)
    else:
        dx = height - width
        box = (0, dx / 2, width, width + dx / 2)
    return box

def thumb_photo(file_path,file_name):
    __img = Image.open(file_path)
    box = clipimage(__img.size)
    region = __img.crop(box)
    size = (348, 348)
    region.thumbnail(size, Image.ANTIALIAS)
    saveToPath = file_name
    region.save(saveToPath, "JPEG")

def hashname(filename):
    import hashlib
    return hashlib.md5().update(filename).hexdigest()

def get_all_image_size(dstdb, dstcurse):
    """
    获取取图片的大小及长宽，补充图片的扩展内容
    """
    IMAGE_FOLDER = '/home/miwoo/workspace/beeso/tools'
    sql = 'select image,id from storage_image'
    dstcurse.execute(sql)
    images = dstcurse.fetchall()
    for img in images:
        filename = os.path.join(IMAGE_FOLDER, img[0][img[0].find("pic"):])
        __img = Image.open(filename)
        ss = 'update storage_image set width=%d,height=%d,size=%d where id=%d'%(__img[0],__img[1],os.path.getsize(filename),img[1])
        dstcurse.execute(sql)
    dstdb.commit()

NICKNAME = [
        "玉"
        "《慈  悲  喜  捨》",
        "交朋友",
        "坑了个坑",
        "雪月枫花",
        "혼란마음",
        "深街酒徒",
        "小白兔",
        "사랑해",
        "ζ　　 结发为聘｀12",
        "和梦仙",
        "陌生人",
        "。活色生香",
        "不想",
        "沦陷-",
        "小壮壮",
        "张小胖                        ",
        "一袍清                        ",
        "无限                          ",
        "小松                          ",
        "JimmyGuo                      ",
        "静听                          ",
        "春生。。。。。凡子            ",
        "吃货+睡货=猪                  ",
        "浩然                          ",
        "贪                            ",
        "摆渡人                        ",
        "Ridiculous、                  ",
        "伟伟                          ",
        "棉花糖                        ",
        "￡煙消雲散彡                  ",
        "呵呵                          ",
        "Joyce                         ",
        "十二                          ",
        "one                           ",
        "嘢爹℡灬                       ",
        "stranger                      ",
        "不忘初心ღ                     ",
        "0℃温柔                        ",
        "VI     赛文                   ",
        "Xenos丶雄                     ",
        "D                             ",
        "习惯的执着                    ",
        "90587                         ",
        "浩然之气                      ",
        "那个女孩                      ",
        "竹                            ",
        "一天到晚                      ",
        "跟着感觉走                    ",
        "阿卡47                        ",
        "Alx 1、                       ",
        "丶沐风                        ",
        "泽七                          ",
        "夏有森光诺流苏                ",
        "Dear Leslie                   ",
        "印月                          ",
        "春风十里                      ",
        "A百味源餐饮培训集团           ",
        "@                             ",
        "吕静                          ",
        "青木梧桐                      ",
        "戚福青                        ",
        "渡口五港                      ",
        "守护着你们@                   ",
        "幂后                          ",
        "Xiao 束負                     ",
        "游华                          ",
        "豪麦科技                      ",
        "◣影子◥                        ",
        "老严                          ",
        "堂堂男孩                      ",
        "心中有善                      ",
        "yu                            ",
        "静以修身                      ",
        "快乐至上                      ",
        "远处的风景                    ",
        "玉红                          ",
        "miao                          ",
        "*:.｡..｡.:*                    ",
        "别怕，你后面还有我            ",
        "蓝天白云                      ",
        "꧁༺EMT༻꧂                       ",
        "(,,•́ . •̀,,)                 ",
        "云朵                          ",
        "레몬맛 고양이                 ",
        "雷公                          ",
        "宁做深夜酒 不做清晨粥         ",
        "天天鲜生鲜传奇                ",
        "my                            ",
        "汏尐爷ぃ                      ",
        "白袍                          ",
        "唅笑                          ",
        "随风缘                        ",
        "猫猫虫                        ",
        "Li Yang                       ",
        "许你，一世安然                ",
        "百味人生.                     ",
        "NeVeR                         ",
        "侯                            ",
        "去年                          ",
        "366日。                       ",
        "辰辰                          ",
        "一帆风顺                      ",
        "杉杉                          ",
        "年终哥                       ",
    ]

def set_item_publisher(db, cursor):
    """
    设置图片集的标题图片，作者发表时间等，以及观看数，点赞数等
    """
    sql = 'select id from storage_item'
    cursor.execute(sql)
    results = cursor.fetchall()
    for result in results:
        sql = 'select thumbnail from storage_image where item_id=%d limit 1'%(result[0])
        cursor.execute(sql)
        img = cursor.fetchone()

        sql = 'update storage_item set publisher="%s",pubdate="%s",weight=%d,avatar="%s",view=%d,liked=%d'\
                    %(  NICKNAME[random.randint(len(NICKNAME))].strip(),
                        "%d-%d-%d %d:%d:%d"%(random.randint(2013,2016),random.randint(1,12),random.randint(1,28),random.randint(5,23),random.randint(1,59),random.randint(1,59)),
                        random.randint(100, 10000),
                        img[0] if img else None,
                        random.randint(10, 100),
                        random.randint(10, 100),
                    )
        cursor.execute(sql)
    db.commit()


def make_recommend_item(db, cursor):
    item_count = 6000
    sql = 'select id from homepage_hot where valid=1'
    cursor.execute(sql)
    results = cursor.fetchall()
    for cate in results:
        sql = 'delete from homepage_hot_items where hot_id=%d' % (cate[0])
        cursor.execute(sql)
        db.commit()

        arrs = {}
        for _ in range(300):
            ids = random.randint(1, item_count)
            while ids in arrs:
                ids = random.randint(1, item_count)
            arrs[ids] = True
            sql = 'insert into homepage_hot_items(hot_id,item_id) values(%d,%d)'%(cate[0], ids)
            cursor.execute(sql)
    db.commit()


if __name__ == '__main__':
    import pdb; pdb.set_trace()
    srcdb, srcurse = connect('root', 'fuckroot', 'spiderdb')
    dstdb, dstcurse = connect('root', 'fuckroot', 'beesodb')

    """
    sql = "select * from photo_album_lib";
    srcurse.execute(sql)
    result = srcurse.fetchall()
    for one in result:
        id = one[0]
        name = one[3]
        thumb = one[4]

        sql = 'insert into storage_item(title, image, uuid_id) values("%s", "%s", "%s")'%(name, "http://static.beeso.cn/images%s"%(thumb), str(uuid.uuid4()).replace("-",""))
        dstcurse.execute(sql)
        dstdb.commit()

        sql = 'select id from storage_item order by id desc limit 1'
        dstcurse.execute(sql)
        newest = dstcurse.fetchone()
        newid = newest[0]

        sql = 'select * from photo_lib where album_id=%d'%(id)
        srcurse.execute(sql)
        images = srcurse.fetchall()
        for img in images:
            iname = img[2]
            filename = img[3]
            seq = img[5]

            sql = 'insert into storage_image(image,seq,item_id) values("%s", %d, %d)'%("http://static.beeso.cn/images%s"%(filename), seq, newid)
            dstcurse.execute(sql)
        dstdb.commit()
    """

    """
    IMAGE_FOLDER = "/home/miwoo/workspace/beeso/tools"
    sql = "select image from storage_image"
    dstcurse.execute(sql)
    images = dstcurse.fetchall()
    for img in images:
        filename = os.path.join(IMAGE_FOLDER, img[0][img[0].find("pic"):])
        if os.path.exists(filename):
            thumb_photo(filename, os.path.join(IMAGE_FOLDER, "thumbnail", "%.jpg"%(hashname(img[0]))))
    """


