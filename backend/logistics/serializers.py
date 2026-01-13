from rest_framework import serializers
from .models import Driver, Truck, Journey, Party,User


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ['username','email', 'password']

    def create(self,validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'], 
            password=validated_data['password']
            )
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'role']

class DriverSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Driver
        fields = '__all__'
        # read_only_fields = ['user']
class DriverRegisterSerializer(serializers.ModelSerializer):
    license_no = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'license_no']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate_license_no(self, value):
        try:
            driver = Driver.objects.get(license_no=value)
        except Driver.DoesNotExist:
            raise serializers.ValidationError("Invalid license number")

        if driver.user:
            raise serializers.ValidationError(
                "An account already exists for this license"
            )

        return value

    def create(self, validated_data):
        license_no = validated_data.pop('license_no')
        driver = Driver.objects.get(license_no=license_no)

        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            role='driver'
        )

        driver.user = user
        driver.save()

        return user

       

class TruckSerializer(serializers.ModelSerializer):
    class Meta:
        model = Truck
        fields = '__all__'


class JourneySerializer(serializers.ModelSerializer):
    class Meta:
        model = Journey
        fields = '__all__'


class PartySerializer(serializers.ModelSerializer):
    class Meta:
        model = Party
        fields = '__all__'