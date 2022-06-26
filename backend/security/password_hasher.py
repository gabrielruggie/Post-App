from inspect import stack
from passlib.hash import sha256_crypt

class PasswordHasher:

    @staticmethod
    def hash (raw_password):
        return sha256_crypt.hash(raw_password)
    
    @staticmethod
    def verify (raw_password, hash_password):
        return sha256_crypt.verify(raw_password, hash_password)
    