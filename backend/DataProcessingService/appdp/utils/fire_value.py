
def update_list(callback):
    callback.extend([7, 7, 7])


def main():
    tmp_list = [1, 3, 4, 5]
    update_list(tmp_list)
    print(tmp_list)


def update_list1(tmp_list):
    tmp_list.extend(['h', 'r', 'g'])
    return tmp_list


def add_list():
    tmp_l = ['1', '3', '4', '2']
    return tmp_l


def main1():
    tmp_list = []
    tmp_list.extend(add_list())
    print(tmp_list)
    # tmp_list1 = update_list1(tmp_list)
    # print(tmp_list)


if __name__ == '__main__':
    # main1()
    pass


class FireValue:
    pass

# import models_a
# from CompositeDataRESTAPIService.api.db import models as m
# from backend.CompositeDataRESTAPIService.api.db import models as m
# f = m.FileDownloadModel()
# print(f)