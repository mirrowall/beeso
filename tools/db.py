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
    IMAGE_FOLDER = "/home/miwoo/workspace/beeso/tools"
    sql = "select image from storage_image"
    dstcurse.execute(sql)
    images = dstcurse.fetchall()
    for img in images:
        filename = os.path.join(IMAGE_FOLDER, img[0][img[0].find("pic"):])
        if os.path.exists(filename):
            thumb_photo(filename, os.path.join(IMAGE_FOLDER, "thumbnail", "%.jpg"%(hashname(img[0]))))

        
